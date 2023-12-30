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

  const [origin, setOrigin] = useState(new Point(0, 0));
  const [zoom, setZoom] = useState<number>(1);

  const scale = useMemo(() => {
    return new Point(1 / zoom, 1 / zoom);
  }, [zoom]);

  const getMousePosition = useCallback(
    (evt: MouseEvent) =>
      new Point(evt.offsetX, evt.offsetY).substract(origin).scale(zoom),
    [origin, zoom]
  );

  const onClickCanvas: NonNullable<KonvaNodeEvents['onClick']> = useCallback(
    ({ evt }) => {
      if (evt.button === 2) {
        // right click
        unselectIfExistElseRemoveHoveredPoint();
        return;
      }
      const position = getMousePosition(evt);

      addOrSelectPoint(position);
    },
    [addOrSelectPoint, unselectIfExistElseRemoveHoveredPoint, getMousePosition]
  );

  const onContextMenuCanvas: NonNullable<KonvaNodeEvents['onContextMenu']> =
    useCallback(({ evt }) => {
      evt.preventDefault();
    }, []);

  const onMouseMoveCanvas: NonNullable<KonvaNodeEvents['onMouseMove']> =
    useCallback(
      ({ evt }) => {
        const position = getMousePosition(evt);
        hoverNearestPointIfClose(position);
        setMousePosition(position);
      },
      [hoverNearestPointIfClose, getMousePosition]
    );

  const onWheelCanvas: NonNullable<KonvaNodeEvents['onWheel']> = useCallback(
    ({ evt }) => {
      const direction = Math.sign(evt.deltaY);
      setZoom((prev) => Math.max(1, Math.min(5, prev + direction)));
    },
    []
  );

  const onDragEndCanvas: NonNullable<KonvaNodeEvents['onDragEnd']> =
    useCallback(({ target }) => {
      const nextOrigin = new Point(target.x(), target.y());
      setOrigin(nextOrigin);
    }, []);

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
    origin: origin,
    scale,
    selectedPoint,
    hoveredPoint,
    creatingSegment,
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
