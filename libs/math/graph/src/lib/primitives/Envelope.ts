import { Polygon } from './Polygon';
import { Segment } from './Segment';

export class Envelope {
  public readonly polygon: Polygon;

  public constructor(
    public readonly skeleton: Segment,
    {
      width = 80,
      roundness = 0,
      polygon,
    }: { width?: number; roundness?: number; polygon?: Polygon },
  ) {
    this.polygon = polygon ?? this.generatePolygon(width, roundness);
  }

  private generatePolygon(width: number, roundness: number) {
    const { p1, p2 } = this.skeleton;

    const radius = width / 2;
    const alpha = p1.subtract(p2).angle();
    // clockwise
    const alphaCw = alpha + Math.PI / 2;
    // counterclockwise
    const alphaCcw = alpha - Math.PI / 2;

    const step = Math.PI / Math.max(1, roundness);
    const epsilon = step / 2;
    const points = [];

    for (let i = alphaCcw; i <= alphaCw + epsilon; i += step) {
      points.push(p1.translate(i, radius));
    }

    for (let i = alphaCcw; i <= alphaCw + epsilon; i += step) {
      points.push(p2.translate(i + Math.PI, radius));
    }

    return new Polygon(points);
  }
}
