import { Drawable } from './drawable';
import { Segment } from './primitives/segment';
import { Point } from './primitives/point';

export class Graph implements Drawable {
  public constructor(
    public readonly points: Point[] = [],
    public readonly segments: Segment[] = []
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    this.segments.forEach((segment) => {
      segment.draw(ctx);
    });

    this.points.forEach((point) => {
      point.draw(ctx);
    });
  }
}
