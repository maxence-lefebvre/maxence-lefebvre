import { Graph, Point, PointSearcher, Segment } from '@feyroads/math/graph';
import { useCallback, useState } from 'react';
import { GraphState } from './types';

const SELECT_NEAREST_IF_DISTANCE_IS_LTE = 20;
const STORAGE_KEY = 'feyroads::useGraph::graph';

// Center of canvas
const initialPoints = [new Point(300, 300)];
const initialSegments: Segment[] = [];

const storedState = localStorage.getItem(STORAGE_KEY);

export const useGraphState = (): GraphState => {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);

  const [graph, setGraph] = useState<Graph>(() => {
    return storedState
      ? Graph.hydrate(storedState)
      : new Graph(initialPoints, initialSegments);
  });

  const saveGraph = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, graph.dehydrate());
  }, [graph]);

  const disposeGraph = useCallback(() => {
    setGraph(new Graph(initialPoints, initialSegments));
  }, []);

  const hoverNearestPointIfClose = useCallback(
    (point: Point) => {
      const nearestPoint = PointSearcher.findNearestPoint(point, graph);
      const isCloseEnough =
        point.distanceTo(nearestPoint) <= SELECT_NEAREST_IF_DISTANCE_IS_LTE;
      setHoveredPoint(isCloseEnough ? nearestPoint : null);
    },
    [graph],
  );

  const unselectIfExistElseRemoveHoveredPoint = useCallback(() => {
    if (selectedPoint) {
      setSelectedPoint(null);
      return;
    }
    if (hoveredPoint && !selectedPoint) {
      setGraph((prev) => prev.removePoint(hoveredPoint));
      setHoveredPoint(null);
      return;
    }
  }, [hoveredPoint, selectedPoint]);

  const selectAndConnectSegmentWithSelection = useCallback(
    (end: Point) => {
      if (selectedPoint) {
        setGraph((prev) =>
          prev.addSegmentIfNotExist(new Segment(selectedPoint, end)),
        );
      }
      setSelectedPoint(end);
    },
    [selectedPoint],
  );

  const addOrSelectPoint = useCallback(
    (point: Point) => {
      if (hoveredPoint) {
        selectAndConnectSegmentWithSelection(hoveredPoint);
        return;
      }
      setGraph((prev) => prev.addPointIfNotExist(point));
      selectAndConnectSegmentWithSelection(point);
      setHoveredPoint(point);
    },
    [hoveredPoint, selectAndConnectSegmentWithSelection],
  );

  const startDraggingPoint = useCallback(() => {
    if (hoveredPoint) {
      const draggedPoint = new Point(hoveredPoint.x, hoveredPoint.y);
      draggedPoint.isDragging = true;

      setGraph((prev) => prev.replacePoint(hoveredPoint, draggedPoint));
    }
  }, [hoveredPoint]);

  const moveDraggingPoint = useCallback(
    (newPosition: Point) => {
      newPosition.isDragging = true;
      const draggedPoint = graph.points.find((point) => point.isDragging);

      setGraph((prev) => {
        return draggedPoint
          ? prev.replacePoint(draggedPoint, newPosition)
          : prev;
      });

      setSelectedPoint((prev) =>
        draggedPoint && prev?.equals(draggedPoint) ? newPosition : prev,
      );
    },
    [graph],
  );

  const dropDraggingPoint = useCallback((newPosition: Point) => {
    setGraph((prev) => {
      const draggedPoint = prev.points.find((point) => point.isDragging);
      return draggedPoint ? prev.replacePoint(draggedPoint, newPosition) : prev;
    });
  }, []);

  return {
    graph,
    saveGraph,
    disposeGraph,
    selectedPoint,
    addOrSelectPoint,
    hoveredPoint,
    hoverNearestPointIfClose,
    unselectIfExistElseRemoveHoveredPoint,
    startDraggingPoint,
    moveDraggingPoint,
    dropDraggingPoint,
  };
};
