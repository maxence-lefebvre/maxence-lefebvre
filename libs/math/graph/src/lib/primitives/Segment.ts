import { linearInterpolation } from '@feyroads/math/core';

import { Point } from './Point';

export class Segment {
  constructor(
    public readonly p1: Point,
    public readonly p2: Point,
  ) {}

  includesPoint(point: Point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  hash() {
    return JSON.stringify(this);
  }

  equals(segment: Segment) {
    return this.includesPoint(segment.p1) && this.includesPoint(segment.p2);
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

    // unfortunately, with floating number, it could be almost 0, so we compare with a little value
    const epsilon = 0.001;
    if (Math.abs(bottom) < epsilon) {
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

  public length() {
    return this.p1.distanceTo(this.p2);
  }

  public directionVector() {
    return this.p2.subtract(this.p1).normalize();
  }

  public distanceToPoint(point: Point) {
    const { point: projection, offset } = this.projectPoint(point);
    return offset > 0 && offset < 1
      ? point.distanceTo(projection)
      : /* projection is either p1 or p2 */ Math.min(
          point.distanceTo(this.p1),
          point.distanceTo(this.p2),
        );
  }

  public projectPoint(point: Point) {
    const directionVector = this.directionVector();
    const a = point.subtract(this.p1);
    const scaleFactor = a.dot(directionVector);

    return {
      point: this.p1.add(directionVector.scale(scaleFactor)),
      offset: scaleFactor / this.p2.subtract(this.p1).magnitude(),
    };
  }
}
