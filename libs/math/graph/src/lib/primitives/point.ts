import { Drawable } from '../drawable';

export class Point implements Drawable<{ size?: number; color?: string }> {
  public constructor(public readonly x: number, public readonly y: number) {}

  draw(
    ctx: CanvasRenderingContext2D,
    { size = 18, color = 'black ' } = {}
  ): void {
    const rad = size / 2;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  equals(point: Point) {
    return this.x === point.x && this.y === point.y;
  }
}
