import { Polygon } from './Polygon';
import { Segment } from './Segment';
import { Point } from './Point';

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

  public static from(polygon: Polygon) {
    return new Envelope(new Segment(new Point(0, 0), new Point(0, 0)), {
      polygon,
    });
  }

  public static breakPolygonsSegmentsAtIntersectionsForAll(
    envelopes: Envelope[],
  ) {
    return Polygon.breakSegmentsAtIntersectionsForAll(
      envelopes.map(({ polygon }) => polygon),
    ).map(Envelope.from);
  }

  private generatePolygon(width: number, roundness: number) {
    const { p1, p2 } = this.skeleton;

    const radius = width / 2;
    const alpha = p1.substract(p2).angle();
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
