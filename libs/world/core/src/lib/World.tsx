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
    private readonly graph: Graph,
    graphicOptions?: WorldGraphicOptions,
  ) {
    this.graphicOptions = defaultsDeep(
      graphicOptions ?? {},
      defaultWorldGraphicOptions,
    );

    this.graph.segments.forEach((segment) => {
      this.envelopes.push(new Envelope(segment, this.graphicOptions.roads));
    });
  }
}
