import { Segment } from './primitives/segment';
import { Point } from './primitives/point';

export class Graph {
  public constructor(
    public readonly points: Point[] = [],
    public readonly segments: Segment[] = []
  ) {}
}
