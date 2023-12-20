export class Point {
  public constructor(public readonly x: number, public readonly y: number) {}

  key() {
    return `${this.x}-${this.y}`;
  }

  equals(point: Point) {
    return this.x === point.x && this.y === point.y;
  }
}
