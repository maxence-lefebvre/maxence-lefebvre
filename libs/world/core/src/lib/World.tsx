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
  thickEnvelopes: Envelope[];
  guides: Segment[];
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
    thickEnvelopes: [],
    guides: [],
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
    const thickEnvelopeWidth =
      this.graphicOptions.roads.width +
      this.graphicOptions.buildings.width +
      2 * this.graphicOptions.buildings.spacing;

    const thickEnvelopes = this.graph.segments.map(
      (segment) =>
        new Envelope(segment, {
          width: thickEnvelopeWidth,
          roundness: this.graphicOptions.roads.roundness,
        }),
    );
    this.debug.thickEnvelopes = thickEnvelopes;

    const guides = Polygon.union(
      Polygon.breakSegmentsAtIntersectionsForAll(
        thickEnvelopes.map(({ polygon }) => polygon),
      ),
    );
    this.debug.guides = guides;

    return [];
  }
}
