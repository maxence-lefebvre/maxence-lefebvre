import { Graph, Point, Segment } from '@feyroads/math/graph';
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

export const useGraph = () => {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  const [graph, setGraph] = useState<Graph>(
    () => new Graph(initialPoints, initialSegments)
  );

  const addPoint = useCallback((point: Point) => {
    setSelectedPoint(point);
    setGraph((prev) => prev.addPointIfNotExist(point));
  }, []);

  return { graph, addPoint, selectedPoint };
};
