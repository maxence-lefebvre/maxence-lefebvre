import { useGraph } from './useGraph';
import { useCallback, useMemo } from 'react';
import { Point, Segment } from '@feyroads/math/graph';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';
import { useViewport } from './useViewport';

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

  const {
    mousePosition,
    setMousePosition,
    origin,
    setOrigin,
    zoom,
    setZoom,
    scale,
    getMousePositionOnViewport,
  } = useViewport();

  const onClickCanvas: NonNullable<KonvaNodeEvents['onClick']> = useCallback(
    ({ evt }) => {
      if (evt.button === 2) {
        // right click
        unselectIfExistElseRemoveHoveredPoint();
        return;
      }
      const position = getMousePositionOnViewport(evt);

      addOrSelectPoint(position);
    },
    [
      addOrSelectPoint,
      unselectIfExistElseRemoveHoveredPoint,
      getMousePositionOnViewport,
    ]
  );

  const onContextMenuCanvas: NonNullable<KonvaNodeEvents['onContextMenu']> =
    useCallback(({ evt }) => {
      evt.preventDefault();
    }, []);

  const onMouseMoveCanvas: NonNullable<KonvaNodeEvents['onMouseMove']> =
    useCallback(
      ({ evt }) => {
        const position = getMousePositionOnViewport(evt);
        hoverNearestPointIfClose(position);
        setMousePosition(position);
      },
      [hoverNearestPointIfClose, setMousePosition, getMousePositionOnViewport]
    );

  const onWheelCanvas: NonNullable<KonvaNodeEvents['onWheel']> = useCallback(
    ({ evt }) => {
      const direction = Math.sign(evt.deltaY);
      setZoom(zoom + direction);
    },
    [zoom, setZoom]
  );

  const isStageDraggable =
    !selectedPoint &&
    !hoveredPoint &&
    !graph.points.some((point) => point.isDragging);

  const onDragEndCanvas: NonNullable<KonvaNodeEvents['onDragEnd']> =
    useCallback(
      ({ target }) => {
        if (!isStageDraggable) {
          return;
        }
        setOrigin(new Point(target.x(), target.y()));
      },
      [graph, setOrigin]
    );

  const onDragMovePoint: NonNullable<KonvaNodeEvents['onDragMove']> =
    useCallback(
      ({ target }) => {
        moveDraggingPoint(new Point(target.x(), target.y()));
      },
      [moveDraggingPoint]
    );

  const onDragEndPoint: NonNullable<KonvaNodeEvents['onDragEnd']> = useCallback(
    ({ evt, target }) => {
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
    origin: origin,
    scale,
    selectedPoint,
    hoveredPoint,
    creatingSegment,
    isStageDraggable,
    onClickCanvas,
    onContextMenuCanvas,
    onMouseMoveCanvas,
    onWheelCanvas,
    onDragEndCanvas,
    onDragStartPoint: startDraggingPoint,
    onDragMovePoint,
    onDragEndPoint,
  };
};
