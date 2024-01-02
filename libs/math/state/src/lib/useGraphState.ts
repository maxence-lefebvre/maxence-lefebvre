import { usePersistableState } from '@feyroads/ext/react/hooks';
import { Graph, Point, PointSearcher, Segment } from '@feyroads/math/graph';
import { find } from 'lodash';
import { useCallback, useState } from 'react';

import { GraphState } from './types';

const SELECT_NEAREST_IF_DISTANCE_IS_LTE = 20;
const STORAGE_KEY = 'feyroads::useGraph::graph';
// Center of canvas
const initialPoints = [new Point(300, 300)];
const initialSegments: Segment[] = [];
export const useGraphState = (): GraphState => {
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);

  const [graph, setGraph, persistGraph] = usePersistableState<Graph>(
    STORAGE_KEY,
    new Graph(initialPoints, initialSegments),
    {
      serialize: (g) => g.dehydrate(),
      deserialize: (s) => Graph.hydrate(s),
    },
  );

  const disposeGraph = useCallback(() => {
    setGraph(new Graph(initialPoints, initialSegments));
  }, [setGraph]);

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
    }
  }, [hoveredPoint, setGraph, selectedPoint]);

  const selectAndConnectSegmentWithSelection = useCallback(
    (end: Point) => {
      if (selectedPoint) {
        setGraph((prev) =>
          prev.addSegmentIfNotExist(new Segment(selectedPoint, end)),
        );
      }
      setSelectedPoint(end);
    },
    [selectedPoint, setGraph],
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
    [hoveredPoint, selectAndConnectSegmentWithSelection, setGraph],
  );

  const startDraggingPoint = useCallback(() => {
    if (hoveredPoint) {
      const draggedPoint = new Point(hoveredPoint.x, hoveredPoint.y);
      draggedPoint.isDragging = true;

      setGraph((prev) => prev.replacePoint(hoveredPoint, draggedPoint));
    }
  }, [hoveredPoint, setGraph]);

  const moveDraggingPoint = useCallback(
    (newPosition: Point) => {
      newPosition.isDragging = true;
      const draggedPoint = find(graph.points, 'isDragging');

      setGraph((prev) => {
        return draggedPoint
          ? prev.replacePoint(draggedPoint, newPosition)
          : prev;
      });

      setSelectedPoint((prev) =>
        draggedPoint && prev?.equals(draggedPoint) ? newPosition : prev,
      );
    },
    [graph, setGraph],
  );

  const dropDraggingPoint = useCallback(
    (newPosition: Point) => {
      setGraph((prev) => {
        const draggedPoint = find(prev.points, 'isDragging');
        return draggedPoint
          ? prev.replacePoint(draggedPoint, newPosition)
          : prev;
      });
    },
    [setGraph],
  );

  return {
    graph,
    saveGraph: persistGraph,
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
