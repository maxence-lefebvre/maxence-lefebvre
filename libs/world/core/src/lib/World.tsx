import { Envelope, Graph, Polygon, Segment } from '@feyroads/math/graph';
import { defaultsDeep } from 'lodash';

export type WorldGraphicOptions = {
  roads: {
    width: number;
    roundness: number;
  };
};

export const defaultWorldGraphicOptions = {
  roads: {
    width: 100,
    roundness: 10,
  },
};

export class World {
  public readonly envelopes: Envelope[] = [];
  public readonly roadBorders: Segment[] = [];

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
  }
}
