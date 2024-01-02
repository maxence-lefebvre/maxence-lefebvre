import { filter, map, some } from 'lodash';

import { Point, Segment } from './primitives';

export class Graph {
  public constructor(
    public readonly points: Point[] = [],
    public readonly segments: Segment[] = [],
  ) {}

  public static hydrate(data: string) {
    const { points = [], segments = [] } = JSON.parse(data);
    return new Graph(map(points, Point.from), map(segments, Segment.from));
  }

  public dehydrate() {
    return JSON.stringify(this);
  }

  public addPointIfNotExist(newPoint: Point): Graph {
    if (some(this.points, (point) => point.equals(newPoint))) {
      // Do nothing, point already exists.
      return this;
    }

    return new Graph([...this.points, newPoint], this.segments);
  }

  public removePoint(removedPoint: Point): Graph {
    const nextPoints = filter(
      this.points,
      (point) => !point.equals(removedPoint),
    );

    if (nextPoints.length === this.points.length) {
      // Do nothing, point was not in the Graph.
      return this;
    }

    const nextSegments = filter(
      this.segments,
      (segment) => !segment.includesPoint(removedPoint),
    );

    return new Graph(nextPoints, nextSegments);
  }

  public replacePoint(previousPoint: Point, nextPoint: Point): Graph {
    const nextPoints = map(this.points, (point) =>
      point.equals(previousPoint) ? nextPoint : point,
    );
    const nextSegments = map(this.segments, (segment) =>
      segment.includesPoint(previousPoint)
        ? new Segment(
            nextPoint,
            segment.p1.equals(previousPoint) ? segment.p2 : segment.p1,
          )
        : segment,
    );

    return new Graph(nextPoints, nextSegments);
  }

  public addSegmentIfNotExist(nextSegment: Segment): Graph {
    if (some(this.segments, (segment) => segment.equals(nextSegment))) {
      // nothing to do, segment already exists.
      return this;
    }

    return new Graph(this.points, [...this.segments, nextSegment]);
  }

  public hash() {
    return JSON.stringify(this);
  }
}
