import { Envelope, Graph, Point, Polygon, Segment } from '@feyroads/math/graph';
import { defaultsDeep } from 'lodash';
import { linearInterpolation } from '@feyroads/math/core';
import { LRUCache } from 'lru-cache';
import { Building, Tree } from './objects';

export type WorldGraphicOptions = {
  roads: {
    width: number;
    roundness: number;
  };
  buildings: {
    width: number;
    minLength: number;
    spacing: number;
  };
  trees: {
    size: number;
  };
};

export const defaultWorldGraphicOptions = {
  roads: {
    width: 100,
    roundness: 10,
  },
  buildings: {
    width: 150,
    minLength: 150,
    spacing: 50,
  },
  trees: {
    size: 160,
  },
};

const treesCache = new LRUCache<string, Tree[]>({ max: 10 });

export type WorldDebug = {
  roadsThickEnvelopes: Envelope[];
  buildingGuides: Segment[];
  buildingSupports: Segment[];
  buildingBases: Envelope[];
};

export type Roads = {
  surfaces: Envelope[];
  medianLines: Segment[];
  borders: Segment[];
};

export class World {
  public readonly buildings: Building[] = [];

  public readonly roads: Roads = {
    surfaces: [],
    medianLines: [],
    borders: [],
  };

  public readonly trees: Tree[] = [];

  public debug: WorldDebug = {
    roadsThickEnvelopes: [],
    buildingGuides: [],
    buildingSupports: [],
    buildingBases: [],
  };

  public readonly graphicOptions: WorldGraphicOptions;

  public constructor(
    public readonly graph: Graph,
    graphicOptions?: WorldGraphicOptions,
  ) {
    this.graphicOptions = defaultsDeep(
      graphicOptions ?? {},
      defaultWorldGraphicOptions,
    );

    const roadSurfaces = this.graph.segments.map(
      (segment) => new Envelope(segment, this.graphicOptions.roads),
    );

    this.roads = {
      surfaces: roadSurfaces,
      medianLines: this.graph.segments,
      borders: Polygon.union(
        Polygon.breakSegmentsAtIntersectionsForAll(
          roadSurfaces.map(({ polygon }) => polygon),
        ),
      ),
    };

    this.buildings = this.generateBuildings();
    this.trees = this.generateTrees();
  }

  generateBuildings() {
    // First generate bigger envelopes around the roads middle segments
    const {
      spacing: buildingSpacing,
      width: buildingWidth,
      minLength: buildingMinLength,
    } = this.graphicOptions.buildings;

    const { width: roadWidth, roundness: roadRoundness } =
      this.graphicOptions.roads;

    const thickEnvelopeWidth = roadWidth + buildingWidth + 2 * buildingSpacing;

    const thickEnvelopes = this.graph.segments.map(
      (segment) =>
        new Envelope(segment, {
          width: thickEnvelopeWidth,
          roundness: roadRoundness,
        }),
    );
    this.debug.roadsThickEnvelopes = thickEnvelopes;

    const guides = Polygon.union(
      Polygon.breakSegmentsAtIntersectionsForAll(
        thickEnvelopes.map(({ polygon }) => polygon),
      ),
    ).filter((guide) => guide.length() >= buildingMinLength);
    this.debug.buildingGuides = guides;

    const supports = guides.flatMap((guide) => {
      const supportLength = guide.length() + buildingSpacing;

      const buildingMinLengthPlusSpacing = buildingMinLength + buildingSpacing;

      const buildingCount = Math.floor(
        supportLength / buildingMinLengthPlusSpacing,
      );

      const buildingLength = supportLength / buildingCount - buildingSpacing;

      const buildingVector = guide.directionVector().scale(buildingLength);
      const buildingPlusSpacingVector = buildingVector.add(
        guide.directionVector().scale(buildingSpacing),
      );

      const buildingSupports: Segment[] = [];

      for (let i = 0; i < buildingCount; i++) {
        buildingSupports.push(
          new Segment(
            guide.p1.add(buildingPlusSpacingVector.scale(i)),
            guide.p1.add(
              buildingVector.add(buildingPlusSpacingVector.scale(i)),
            ),
          ),
        );
      }

      return buildingSupports;
    });

    this.debug.buildingSupports = supports;

    const bases = supports.map(
      (support) => new Envelope(support, { width: buildingWidth }),
    );

    for (let i = 0; i < bases.length - 1; i++) {
      const baseA = bases[i].polygon;
      for (let j = i + 1; j < bases.length; j++) {
        const baseB = bases[j].polygon;
        if (
          baseA.intersects(baseB) ||
          baseA.distanceTo(baseB) <= buildingSpacing - 0.001
        ) {
          bases.splice(j, 1);
          j--;
        }
      }
    }

    this.debug.buildingBases = bases;

    return bases.map((base) => new Building(base));
  }

  generateTrees() {
    const key = this.graph.hash();

    const cachedTrees = treesCache.get(key);

    if (cachedTrees) {
      return cachedTrees;
    }

    const trees: Tree[] = [];

    const worldPoints = [
      ...this.roads.borders.flatMap(({ p1, p2 }) => [p1, p2]),
      ...this.buildings.flatMap(({ base }) => base.points),
    ];

    const leftestPoint = Math.min(...worldPoints.map(({ x }) => x));
    const rightestPoint = Math.max(...worldPoints.map(({ x }) => x));
    const highestPoint = Math.min(...worldPoints.map(({ y }) => y));
    const lowestPoint = Math.max(...worldPoints.map(({ y }) => y));

    const worldPolygons = [
      ...this.buildings.flatMap(({ base }) => base),
      ...this.roads.surfaces.flatMap(({ polygon }) => polygon),
    ];

    // Generate trees until we can't find a right spot after 100 attempts.
    let treeAttemptCount = 0;

    while (treeAttemptCount <= 100) {
      const center = new Point(
        linearInterpolation(leftestPoint, rightestPoint, Math.random()),
        linearInterpolation(lowestPoint, highestPoint, Math.random()),
      );

      const tree = new Tree(center);

      if (this.shouldKeepTree(tree, trees, worldPolygons)) {
        trees.push(tree);
        treeAttemptCount = 0;
      }
      treeAttemptCount++;
    }

    treesCache.set(key, trees);

    return trees;
  }

  private shouldKeepTree(
    tree: Tree,
    otherTrees: Tree[],
    worldPolygons: Polygon[],
  ) {
    const {
      trees: { size: treeSize },
    } = this.graphicOptions;

    const spacing = 40;

    // Don't keep the tree if it is inside or nearby a building or a road
    if (
      worldPolygons.some(
        (polygon) =>
          polygon.containsPoint(tree.center) ||
          polygon.distanceToPoint(tree.center) < treeSize / 2 + spacing,
      )
    ) {
      return false;
    }

    // Trees shouldn't overlap
    if (
      otherTrees.some(
        (otherTree) =>
          otherTree.center.distanceTo(tree.center) < treeSize + spacing,
      )
    ) {
      return false;
    }

    // Trees shouldn't grow in the middle of nowhere
    return worldPolygons.some(
      (polygon) => polygon.distanceToPoint(tree.center) < 2 * treeSize,
    );
  }
}
