import { Point } from './primitives/Point';
import { Graph } from './Graph';
import invariant from 'invariant';

export class PointSearcher {
  public static findNearestPoint(referencePoint: Point, graph: Graph) {
    invariant(graph.points.length > 0, 'Graph MUST have at least one point');

    const [firstPoint] = graph.points;

    const [nearestPoint] = graph.points.reduce(
      ([nearest, minDist]: [Point, number], point) => {
        const dist = referencePoint.distanceTo(point);
        return dist < minDist ? [point, dist] : [nearest, minDist];
      },
      [firstPoint, referencePoint.distanceTo(firstPoint)],
    );

    return nearestPoint;
  }
}
