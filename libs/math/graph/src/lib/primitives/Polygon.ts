import { Point } from './Point';
import { Segment } from './Segment';
import { clone } from 'lodash';

export class Polygon {
  public constructor(
    public readonly points: Point[],
    public readonly segments: Segment[] = [],
  ) {
    if (this.segments.length) {
      return;
    }
    for (let i = 1; i <= points.length; i++) {
      this.segments.push(new Segment(points[i - 1], points[i % points.length]));
    }
  }

  public static union(polygons: Polygon[]) {
    const segments: Segment[] = [];

    polygons.forEach((polygon, i) => {
      polygon.segments.forEach((segment) => {
        // FIXME: looks like we keep segments that belong to 3 polygons.
        // Keep the segment if no other polygons contains that segment
        if (
          !polygons.some(
            (polygonB, j) => i !== j && polygonB.containsSegment(segment),
          )
        ) {
          if (!segments.some((keptSegment) => keptSegment.equals(segment))) {
            segments.push(segment);
          }
        }
      });
    });

    return segments;
  }

  public static breakSegmentsAtIntersectionsForAll(polys: Polygon[]) {
    const polygons = clone(polys);

    for (let i = 0; i < polygons.length - 1; i++) {
      for (let j = i + 1; j < polygons.length; j++) {
        const [a, b] = Polygon.breakSegmentAtIntersections(
          polygons[i],
          polygons[j],
        );
        polygons[i] = a;
        polygons[j] = b;
      }
    }

    return polygons;
  }

  public static breakSegmentAtIntersections(
    polygonA: Polygon,
    polygonB: Polygon,
  ) {
    const segmentsA = clone(polygonA.segments);
    const segmentsB = clone(polygonB.segments);

    for (let i = 0; i < segmentsA.length; i++) {
      const segmentA = segmentsA[i];
      for (let j = 0; j < segmentsB.length; j++) {
        const segmentB = segmentsB[j];
        const intersection = segmentA.intersect(segmentB);
        if (!intersection) {
          continue;
        }

        const { point, offset } = intersection;

        if ([0, 1].includes(offset)) {
          continue;
        }

        segmentsA.splice(
          i,
          1,
          new Segment(segmentA.p1, point),
          new Segment(point, segmentA.p2),
        );

        // skip added segment (important, else it will infinite loop)
        i++;

        segmentsB.splice(
          j,
          1,
          new Segment(segmentB.p1, point),
          new Segment(point, segmentB.p2),
        );

        // skip added segment (important, else it will infinite loop)
        j++;
      }
    }

    return [
      new Polygon(polygonA.points, segmentsA),
      new Polygon(polygonB.points, segmentsB),
    ];
  }

  public containsSegment(segment: Segment) {
    return this.containsPoint(segment.midpoint());
  }

  public containsPoint(point: Point) {
    const outerPoint = new Point(-1000, -1000);

    let intersectionCount = 0;

    this.segments.forEach((segment) => {
      const intersection = new Segment(outerPoint, point).intersect(segment);
      if (intersection) {
        intersectionCount++;
      }
    });

    return intersectionCount % 2 === 1;
  }

  intersects(polygon: Polygon) {
    return this.segments.some((segmentA) =>
      polygon.segments.some((segmentB) => segmentB.intersect(segmentA)),
    );
  }
}
