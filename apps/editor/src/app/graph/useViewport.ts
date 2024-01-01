import { useCallback, useMemo, useState } from 'react';
import { Point } from '@feyroads/math/graph';
import { GraphState, Viewport } from './types';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';
import { usePersistableState } from '@feyroads/ext/react/hooks';

const ORIGIN_STORAGE_KEY = 'feyroads::useViewport::origin';
const ZOOM_STORAGE_KEY = 'feyroads::useViewport::zoom';

export const useViewport = ({
  graphState,
}: {
  graphState: GraphState;
}): Viewport => {
  const [mousePosition, setMousePosition] = useState<Point | null>(null);
  const [origin, setOrigin, persistOrigin] = usePersistableState<Point>(
    ORIGIN_STORAGE_KEY,
    new Point(0, 0),
    {
      deserialize: (s: string) => {
        const { x, y } = JSON.parse(s) as { x: number; y: number };
        return new Point(x, y);
      },
    },
  );

  const [zoom, setZoom, persistZoom] = usePersistableState<number>(
    ZOOM_STORAGE_KEY,
    1,
    {
      deserialize: (s: string) => +s,
    },
  );

  const saveViewportState = useCallback(() => {
    persistOrigin();
    persistZoom();
  }, [persistOrigin, persistZoom]);

  const bindZoom = useCallback(
    (nextZoom: number) => {
      setZoom(Math.max(1, Math.min(5, nextZoom)));
    },
    [setZoom],
  );

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
      [isStageDraggable, setOrigin],
    );

  return {
    origin,
    setOrigin,
    zoom,
    setZoom: bindZoom,
    scale,
    saveViewportState,
    mousePosition,
    setMousePosition,
    getMousePositionOnViewport,
    isStageDraggable,
    onDragEndCanvas,
  };
};
