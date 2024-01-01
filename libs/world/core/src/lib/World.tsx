import { Envelope, Graph, Polygon, Segment } from '@feyroads/math/graph';
import { defaultsDeep } from 'lodash';

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
};

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
  public readonly buildings: Envelope[] = [];

  public readonly roads: Roads = {
    surfaces: [],
    medianLines: [],
    borders: [],
  };

  public debug: WorldDebug = {
    roadsThickEnvelopes: [],
    buildingGuides: [],
    buildingSupports: [],
    buildingBases: [],
  };

  private readonly graphicOptions: WorldGraphicOptions;

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
        if (baseA.intersects(baseB)) {
          bases.splice(j, 1);
          j--;
        }
      }
    }

    this.debug.buildingBases = bases;

    return bases;
  }
}
