import { Drawable } from '../drawable';
import { Point } from './point';

export class Segment implements Drawable<{ width?: number; color?: string }> {
  constructor(public readonly p1: Point, public readonly p2: Point) {}

  draw(
    ctx: CanvasRenderingContext2D,
    { width = 2, color = 'black' } = {}
  ): void {
    const { p1, p2 } = this;

    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;

    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  equals(segment: Segment) {
    return this.includes(segment.p1) && this.includes(segment.p2);
  }

  includes(point: Point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }
}
