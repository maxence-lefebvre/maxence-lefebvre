import { Segment } from './primitives/Segment';
import { Point } from './primitives/Point';

export class Graph {
  public constructor(
    public readonly points: Point[] = [],
    public readonly segments: Segment[] = []
  ) {}

  public addPointIfNotExist(newPoint: Point): Graph {
    if (this.points.some((point) => point.equals(newPoint))) {
      // Do nothing, point already exists.
      return this;
    }

    return new Graph([...this.points, newPoint], this.segments);
  }

  public removePoint(removedPoint: Point): Graph {
    const nextPoints = this.points.filter(
      (point) => !point.equals(removedPoint)
    );

    if (nextPoints.length === this.points.length) {
      // Do nothing, point was not in the Graph.
      return this;
    }

    const nextSegments = this.segments.filter(
      (segment) => !segment.includes(removedPoint)
    );

    return new Graph(nextPoints, nextSegments);
  }
}
