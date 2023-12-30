export class Point {
  public isDragging = false;

  public constructor(public readonly x: number, public readonly y: number) {}

  key() {
    return `${this.x}-${this.y}`;
  }

  equals(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  distanceTo(point: Point) {
    return Math.hypot(this.x - point.x, this.y - point.y);
  }

  add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y);
  }

  substract(point: Point) {
    return new Point(this.x - point.x, this.y - point.y);
  }

  scale(factor: number) {
    return new Point(this.x * factor, this.y * factor);
  }

  public static from({ x, y }: { x: number; y: number }) {
    return new Point(x, y);
  }
}
