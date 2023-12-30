import { useGraph } from './useGraph';
import { useCallback, useMemo, useState } from 'react';
import { Point, Segment } from '@feyroads/math/graph';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';

export const useGraphEditor = () => {
  const {
    graph,
    selectedPoint,
    addOrSelectPoint,
    hoveredPoint,
    hoverNearestPointIfClose,
    unselectIfExistElseRemoveHoveredPoint,
    startDraggingPoint,
    moveDraggingPoint,
    dropDraggingPoint,
  } = useGraph();

  const [mousePosition, setMousePosition] = useState<Point | null>(null);

  const onClickCanvas: NonNullable<KonvaNodeEvents['onClick']> = useCallback(
    ({ evt }) => {
      if (evt.button === 2) {
        // right click
        unselectIfExistElseRemoveHoveredPoint();
        return;
      }
      addOrSelectPoint(new Point(evt.offsetX, evt.offsetY));
    },
    [addOrSelectPoint]
  );

  const onContextMenuCanvas: NonNullable<KonvaNodeEvents['onContextMenu']> =
    useCallback(
      ({ evt }) => {
        evt.preventDefault();
      },
      [unselectIfExistElseRemoveHoveredPoint]
    );

  const onMouseMoveCanvas: NonNullable<KonvaNodeEvents['onMouseMove']> =
    useCallback(
      ({ evt }) => {
        hoverNearestPointIfClose(new Point(evt.offsetX, evt.offsetY));
        setMousePosition(new Point(evt.offsetX, evt.offsetY));
      },
      [hoverNearestPointIfClose]
    );

  const onDragMovePoint: NonNullable<KonvaNodeEvents['onDragMove']> =
    useCallback(
      ({ target }) => {
        moveDraggingPoint(new Point(target.x(), target.y()));
      },
      [moveDraggingPoint]
    );

  const onDragEndPoint: NonNullable<KonvaNodeEvents['onDragEnd']> = useCallback(
    ({ target }) => {
      dropDraggingPoint(new Point(target.x(), target.y()));
    },
    [dropDraggingPoint]
  );

  const creatingSegment = useMemo(
    () =>
      selectedPoint &&
      mousePosition &&
      new Segment(selectedPoint, hoveredPoint ?? mousePosition),
    [selectedPoint, hoveredPoint, mousePosition]
  );

  return {
    graph,
    selectedPoint,
    hoveredPoint,
    creatingSegment,
    onClickCanvas,
    onContextMenuCanvas,
    onMouseMoveCanvas,
    onDragStartPoint: startDraggingPoint,
    onDragMovePoint,
    onDragEndPoint,
  };
};
