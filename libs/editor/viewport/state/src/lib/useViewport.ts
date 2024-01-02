import { usePersistableState } from '@feyroads/ext/react/hooks';
import { Point } from '@feyroads/math/graph';
import { GraphState } from '@feyroads/math/state';
import Konva from 'konva';
import { some } from 'lodash';
import { useCallback, useMemo, useRef, useState } from 'react';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';

import { Viewport } from './types';

const ORIGIN_STORAGE_KEY = 'feyroads::useViewport::origin';
const ZOOM_STORAGE_KEY = 'feyroads::useViewport::zoom';

export const useViewport = ({
  graphState,
}: {
  graphState: GraphState;
}): Viewport => {
  const canvasRef = useRef<Konva.Stage>(null);

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

  const center = useMemo(() => {
    const canvas = canvasRef.current;

    const referencePoint = canvas
      ? new Point(canvas.width() * 0.45, canvas.height() * 0.85)
      : new Point(600 * 0.5, 600 * 0.75);

    return referencePoint.subtract(origin).scale(zoom);
  }, [origin, zoom]);

  const saveViewportState = useCallback(() => {
    persistOrigin();
    persistZoom();
  }, [persistOrigin, persistZoom]);

  const bindZoom = useCallback(
    (nextZoom: number) => {
      setZoom(Math.max(1, Math.min(10, nextZoom)));
    },
    [setZoom],
  );

  const scale = useMemo(() => {
    return new Point(1 / zoom, 1 / zoom);
  }, [zoom]);

  const getMousePositionOnViewport = useCallback(
    (evt: MouseEvent) =>
      new Point(evt.offsetX, evt.offsetY).subtract(origin).scale(zoom),
    [origin, zoom],
  );

  const isStageDraggable =
    !graphState.selectedPoint &&
    !graphState.hoveredPoint &&
    !some(graphState.graph.points, 'isDragging');

  const onDragEndCanvas: NonNullable<
    KonvaNodeEvents['onDragEnd'] | KonvaNodeEvents['onDragMove']
  > = useCallback(
    ({ target }) => {
      if (!isStageDraggable) {
        return;
      }
      setOrigin(new Point(target.x(), target.y()));
    },
    [isStageDraggable, setOrigin],
  );

  return {
    canvasRef,
    origin,
    setOrigin,
    center,
    zoom,
    setZoom: bindZoom,
    scale,
    saveViewportState,
    mousePosition,
    setMousePosition,
    getMousePositionOnViewport,
    isStageDraggable,
    onDragMoveCanvas: onDragEndCanvas,
    onDragEndCanvas,
  };
};
