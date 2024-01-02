import { useCallback, useMemo } from 'react';
import { Point, Segment } from '@feyroads/math/graph';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';
import { Viewport } from '@feyroads/editor/viewport/components';
import { GraphState } from '@feyroads/math/components';
import { GraphEditor } from './types';

export const useGraphEditor = ({
  graphState,
  viewport,
}: {
  graphState: GraphState;
  viewport: Viewport;
}): GraphEditor => {
  const onClickCanvas: NonNullable<KonvaNodeEvents['onClick']> = useCallback(
    ({ evt }) => {
      if (evt.button === 2) {
        // right click
        graphState.unselectIfExistElseRemoveHoveredPoint();
        return;
      }
      const position = viewport.getMousePositionOnViewport(evt);

      graphState.addOrSelectPoint(position);
    },
    [graphState, viewport],
  );

  const onContextMenuCanvas: NonNullable<KonvaNodeEvents['onContextMenu']> =
    useCallback(({ evt }) => {
      evt.preventDefault();
    }, []);

  const onMouseMoveCanvas: NonNullable<KonvaNodeEvents['onMouseMove']> =
    useCallback(
      ({ evt }) => {
        const position = viewport.getMousePositionOnViewport(evt);
        graphState.hoverNearestPointIfClose(position);
        viewport.setMousePosition(position);
      },
      [graphState, viewport],
    );

  const onWheelCanvas: NonNullable<KonvaNodeEvents['onWheel']> = useCallback(
    ({ evt }) => {
      const direction = Math.sign(evt.deltaY);
      viewport.setZoom(viewport.zoom + direction);
    },
    [viewport],
  );

  const onDragMovePoint: NonNullable<KonvaNodeEvents['onDragMove']> =
    useCallback(
      ({ target }) => {
        graphState.moveDraggingPoint(new Point(target.x(), target.y()));
      },
      [graphState],
    );

  const onDragEndPoint: NonNullable<KonvaNodeEvents['onDragEnd']> = useCallback(
    ({ target }) => {
      graphState.dropDraggingPoint(new Point(target.x(), target.y()));
    },
    [graphState],
  );

  const creatingSegment = useMemo(
    () =>
      graphState.selectedPoint &&
      viewport.mousePosition &&
      new Segment(
        graphState.selectedPoint,
        graphState.hoveredPoint ?? viewport.mousePosition,
      ),
    [graphState, viewport],
  );

  return {
    creatingSegment,
    onClickCanvas,
    onContextMenuCanvas,
    onMouseMoveCanvas,
    onWheelCanvas,
    onDragStartPoint: graphState.startDraggingPoint,
    onDragMovePoint,
    onDragEndPoint,
  };
};
