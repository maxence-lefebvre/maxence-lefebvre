import { Segment } from './primitives/segment';
import { Point } from './primitives/point';

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
}
