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
  const [zoom, setZoom] = useState<number>(1);

  const onClickCanvas: NonNullable<KonvaNodeEvents['onClick']> = useCallback(
    ({ evt }) => {
      if (evt.button === 2) {
        // right click
        unselectIfExistElseRemoveHoveredPoint();
        return;
      }
      addOrSelectPoint(new Point(evt.offsetX * zoom, evt.offsetY * zoom));
    },
    [addOrSelectPoint, zoom]
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
        hoverNearestPointIfClose(
          new Point(evt.offsetX * zoom, evt.offsetY * zoom)
        );
        setMousePosition(new Point(evt.offsetX * zoom, evt.offsetY * zoom));
      },
      [hoverNearestPointIfClose]
    );

  const onWheelCanvas: NonNullable<KonvaNodeEvents['onWheel']> = useCallback(
    ({ evt }) => {
      const direction = Math.sign(evt.deltaY);
      setZoom((prev) => Math.max(1, Math.min(5, prev + direction)));
    },
    []
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
    scale: 1 / zoom,
    selectedPoint,
    hoveredPoint,
    creatingSegment,
    onClickCanvas,
    onContextMenuCanvas,
    onMouseMoveCanvas,
    onWheelCanvas,
    onDragStartPoint: startDraggingPoint,
    onDragMovePoint,
    onDragEndPoint,
  };
};
