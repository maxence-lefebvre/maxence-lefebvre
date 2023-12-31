import { Segment, Point } from './primitives';

export class Graph {
  public constructor(
    public readonly points: Point[] = [],
    public readonly segments: Segment[] = [],
  ) {}

  public static hydrate(data: string) {
    const { points = [], segments = [] } = JSON.parse(data);
    return new Graph(points.map(Point.from), segments.map(Segment.from));
  }

  public dehydrate() {
    return JSON.stringify(this);
  }

  public addPointIfNotExist(newPoint: Point): Graph {
    if (this.points.some((point) => point.equals(newPoint))) {
      // Do nothing, point already exists.
      return this;
    }

    return new Graph([...this.points, newPoint], this.segments);
  }

  public removePoint(removedPoint: Point): Graph {
    const nextPoints = this.points.filter(
      (point) => !point.equals(removedPoint),
    );

    if (nextPoints.length === this.points.length) {
      // Do nothing, point was not in the Graph.
      return this;
    }

    const nextSegments = this.segments.filter(
      (segment) => !segment.includes(removedPoint),
    );

    return new Graph(nextPoints, nextSegments);
  }

  public replacePoint(previousPoint: Point, nextPoint: Point): Graph {
    const nextPoints = this.points.map((point) =>
      point.equals(previousPoint) ? nextPoint : point,
    );
    const nextSegments = this.segments.map((segment) =>
      segment.includes(previousPoint)
        ? new Segment(
            nextPoint,
            segment.p1.equals(previousPoint) ? segment.p2 : segment.p1,
          )
        : segment,
    );

    return new Graph(nextPoints, nextSegments);
  }

  public addSegmentIfNotExist(nextSegment: Segment): Graph {
    if (this.segments.some((segment) => segment.equals(nextSegment))) {
      // nothing to do, segment already exists.
      return this;
    }

    return new Graph(this.points, [...this.segments, nextSegment]);
  }
}
