import { linearInterpolation } from '@feyroads/math/core';

export class Point {
  public isDragging = false;

  public constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  hash() {
    return JSON.stringify(this);
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

  public dot(point: Point) {
    return this.x * point.x + this.y * point.y;
  }

  scale(factor: number) {
    return new Point(this.x * factor, this.y * factor);
  }

  public static from({ x, y }: { x: number; y: number }) {
    return new Point(x, y);
  }

  public translate(angle: number, offset: number) {
    return this.add(new Point(Math.cos(angle), Math.sin(angle)).scale(offset));
  }

  public angle() {
    return Math.atan2(this.y, this.x);
  }

  public normalize() {
    return this.scale(1 / this.magnitude());
  }

  public magnitude() {
    return Math.hypot(this.x, this.y);
  }

  public linearInterpolation(point: Point, t: number) {
    return new Point(
      linearInterpolation(this.x, point.x, t),
      linearInterpolation(this.y, point.y, t),
    );
  }
}
