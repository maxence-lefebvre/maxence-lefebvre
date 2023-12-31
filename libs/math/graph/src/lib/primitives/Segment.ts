import { Point } from './Point';

export class Segment {
  constructor(
    public readonly p1: Point,
    public readonly p2: Point,
  ) {}

  includes(point: Point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  key() {
    return `${this.p1.key()}---${this.p2.key()}`;
  }

  equals(segment: Segment) {
    return this.includes(segment.p1) && this.includes(segment.p2);
  }

  public static from({
    p1,
    p2,
  }: {
    p1: { x: number; y: number };
    p2: { x: number; y: number };
  }) {
    return new Segment(Point.from(p1), Point.from(p2));
  }
}
