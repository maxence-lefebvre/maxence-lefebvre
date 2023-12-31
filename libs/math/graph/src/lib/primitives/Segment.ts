import { Point } from './Point';

const linearInterpolation = (a: number, b: number, t: number) =>
  a + t * (b - a);

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

  public intersect(segment: Segment) {
    const { p1: A, p2: B } = this;
    const { p1: C, p2: D } = segment;

    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom === 0) {
      return null;
    }

    const t = tTop / bottom;
    const u = uTop / bottom;

    if (t < 0 || t > 1 || u < 0 || u > 1) {
      return null;
    }

    return {
      point: new Point(
        linearInterpolation(A.x, B.x, t),
        linearInterpolation(A.y, B.y, t),
      ),
      offset: t,
    };
  }

  public midpoint() {
    return this.p1.add(this.p2).scale(1 / 2);
  }
}
