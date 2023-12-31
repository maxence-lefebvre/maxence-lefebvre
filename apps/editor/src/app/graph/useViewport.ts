import { useCallback, useMemo, useState } from 'react';
import { Point } from '@feyroads/math/graph';
import { GraphState, Viewport } from './types';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';

export const useViewport = ({
  graphState,
}: {
  graphState: GraphState;
}): Viewport => {
  const [mousePosition, setMousePosition] = useState<Point | null>(null);
  const [origin, setOrigin] = useState(new Point(0, 0));
  const [zoom, setZoom] = useState<number>(1);

  const bindZoom = useCallback((nextZoom: number) => {
    setZoom(Math.max(1, Math.min(5, nextZoom)));
  }, []);

  const scale = useMemo(() => {
    return new Point(1 / zoom, 1 / zoom);
  }, [zoom]);

  const getMousePositionOnViewport = useCallback(
    (evt: MouseEvent) =>
      new Point(evt.offsetX, evt.offsetY).substract(origin).scale(zoom),
    [origin, zoom],
  );

  const isStageDraggable =
    !graphState.selectedPoint &&
    !graphState.hoveredPoint &&
    !graphState.graph.points.some((point) => point.isDragging);

  const onDragEndCanvas: NonNullable<KonvaNodeEvents['onDragEnd']> =
    useCallback(
      ({ target }) => {
        if (!isStageDraggable) {
          return;
        }
        setOrigin(new Point(target.x(), target.y()));
      },
      [isStageDraggable],
    );

  return {
    origin,
    setOrigin,
    zoom,
    setZoom: bindZoom,
    scale,
    mousePosition,
    setMousePosition,
    getMousePositionOnViewport,
    isStageDraggable,
    onDragEndCanvas,
  };
};
