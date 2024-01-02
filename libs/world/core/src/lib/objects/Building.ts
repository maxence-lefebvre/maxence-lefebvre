import { Envelope, Polygon } from '@feyroads/math/graph';

export class Building {
  public base: Polygon;

  public constructor(envelope: Envelope) {
    this.base = envelope.polygon;
  }

  hash() {
    return JSON.stringify(this);
  }
}
