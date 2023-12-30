import { Graph, Point, PointSearcher, Segment } from '@feyroads/math/graph';
import { useCallback, useMemo, useState } from 'react';

const initialPoints = [
  new Point(200, 200),
  new Point(500, 200),
  new Point(400, 400),
  new Point(100, 300),
];

const [p1, p2, p3, p4] = initialPoints;

const initialSegments = [
  new Segment(p1, p2),
  new Segment(p1, p3),
  new Segment(p1, p4),
  new Segment(p2, p3),
];

const SELECT_NEAREST_IF_DISTANCE_IS_LTE = 20;

export const useGraph = () => {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);

  const [graph, setGraph] = useState<Graph>(
    () => new Graph(initialPoints, initialSegments)
  );

  const hoverNearestPointIfClose = useCallback(
    (point: Point) => {
      const nearestPoint = PointSearcher.findNearestPoint(point, graph);
      const isCloseEnough =
        point.distanceTo(nearestPoint) <= SELECT_NEAREST_IF_DISTANCE_IS_LTE;
      setHoveredPoint(isCloseEnough ? nearestPoint : null);
    },
    [graph]
  );

  const addOrSelectPoint = useCallback(
    (point: Point) => {
      if (hoveredPoint) {
        setSelectedPoint(hoveredPoint);
        return;
      }
      setGraph((prev) => prev.addPointIfNotExist(point));
      setSelectedPoint(point);
    },
    [hoveredPoint]
  );

  return {
    graph,
    selectedPoint,
    addOrSelectPoint,
    hoveredPoint,
    hoverNearestPointIfClose,
  };
};
