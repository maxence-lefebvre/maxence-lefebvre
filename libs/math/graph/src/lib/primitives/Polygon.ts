import { clone, forEach, includes, invokeMap, map, some } from 'lodash';

import { Point } from './Point';
import { Segment } from './Segment';

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

    forEach(polygons, (polygon, i) => {
      forEach(polygon.segments, (segment) => {
        if (
          !some(
            polygons,
            (polygonB, j) => i !== j && polygonB.containsSegment(segment),
          ) &&
          !some(segments, (keptSegment) => keptSegment.equals(segment))
        ) {
          segments.push(segment);
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

        if (includes([0, 1], offset)) {
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

    forEach(this.segments, (segment) => {
      const intersection = new Segment(outerPoint, point).intersect(segment);
      if (intersection) {
        intersectionCount++;
      }
    });

    return intersectionCount % 2 === 1;
  }

  public intersects(polygon: Polygon) {
    return some(this.segments, (segmentA) =>
      some(polygon.segments, (segmentB) => segmentB.intersect(segmentA)),
    );
  }

  public distanceToPoint(point: Point) {
    return Math.min(...invokeMap(this.segments, 'distanceToPoint', point));
  }

  distanceTo(polygon: Polygon) {
    return Math.min(
      ...map(this.points, (point) => polygon.distanceToPoint(point)),
    );
  }

  hash() {
    return JSON.stringify(this);
  }
}
