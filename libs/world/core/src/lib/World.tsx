import { Envelope, Graph } from '@feyroads/math/graph';
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
    roundness: 3,
  },
};

export class World {
  public readonly envelopes: Envelope[] = [];

  private readonly graphicOptions: WorldGraphicOptions;

  public constructor(
    public readonly graph: Graph,
    graphicOptions?: WorldGraphicOptions,
  ) {
    this.graphicOptions = defaultsDeep(
      graphicOptions ?? {},
      defaultWorldGraphicOptions,
    );

    this.envelopes = Envelope.breakPolygonsSegmentsAtIntersectionsForAll(
      this.graph.segments.map(
        (segment) => new Envelope(segment, this.graphicOptions.roads),
      ),
    );
  }
}
