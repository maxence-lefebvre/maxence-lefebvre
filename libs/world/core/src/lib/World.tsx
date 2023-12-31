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

export class World {
  public readonly envelopes: Envelope[] = [];
  public readonly roadBorders: Segment[] = [];
  public readonly buildings: Envelope[] = [];

  public guides: Segment[] = [];

  private readonly graphicOptions: WorldGraphicOptions;

  public constructor(
    public readonly graph: Graph,
    graphicOptions?: WorldGraphicOptions,
  ) {
    this.graphicOptions = defaultsDeep(
      graphicOptions ?? {},
      defaultWorldGraphicOptions,
    );

    this.envelopes = this.graph.segments.map(
      (segment) => new Envelope(segment, this.graphicOptions.roads),
    );

    this.roadBorders = Polygon.union(
      Polygon.breakSegmentsAtIntersectionsForAll(
        this.envelopes.map(({ polygon }) => polygon),
      ),
    );

    this.buildings = this.generateBuildings();
  }

  generateBuildings() {
    // First generate bigger envelopes around the roads middle segments
    const thickEnvelopes = this.graph.segments.map(
      (segment) =>
        new Envelope(segment, {
          width:
            this.graphicOptions.roads.width +
            this.graphicOptions.buildings.width +
            2 * this.graphicOptions.buildings.spacing,
          roundness: this.graphicOptions.roads.roundness,
        }),
    );

    const guides = Polygon.union(thickEnvelopes.map(({ polygon }) => polygon));
    this.guides = guides;

    return thickEnvelopes;
  }
}
