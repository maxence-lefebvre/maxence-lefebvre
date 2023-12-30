import { css } from '@emotion/react';
import { useGraph } from './graph/useGraph';
import { Layer, Stage } from 'react-konva';
import { DrawPoint } from './graph/DrawPoint';
import { DrawSegment } from './graph/DrawSegment';
import { useCallback, useState } from 'react';
import { Point, Segment } from '@feyroads/math/graph';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';

export const App = () => {
  const {
    graph,
    selectedPoint,
    addOrSelectPoint,
    hoveredPoint,
    hoverNearestPointIfClose,
    removeHoveredPointIfExistElseUnselect,
    startDraggingPoint,
    moveDraggingPoint,
    dropDraggingPoint,
  } = useGraph();
  const { segments, points } = graph;

  const [mousePosition, setMousePosition] = useState<Point | null>(null);

  const onClickCanvas: NonNullable<KonvaNodeEvents['onClick']> = useCallback(
    ({ evt }) => {
      addOrSelectPoint(new Point(evt.offsetX, evt.offsetY));
    },
    [addOrSelectPoint]
  );

  const onMouseMoveCanvas: NonNullable<KonvaNodeEvents['onMouseMove']> =
    useCallback(
      ({ evt }) => {
        hoverNearestPointIfClose(new Point(evt.offsetX, evt.offsetY));
        setMousePosition(new Point(evt.offsetX, evt.offsetY));
      },
      [hoverNearestPointIfClose]
    );

  const onRightClickCanvas: NonNullable<KonvaNodeEvents['onContextMenu']> =
    useCallback(
      ({ evt }) => {
        evt.preventDefault();
        removeHoveredPointIfExistElseUnselect();
      },
      [removeHoveredPointIfExistElseUnselect]
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

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 20px;

        align-items: center;
      `}
    >
      <Stage
        width={600}
        height={600}
        css={css`
          width: 600px;
          height: 600px;
          background-color: #2a5;
        `}
        onClick={onClickCanvas}
        onContextMenu={onRightClickCanvas}
        onMouseMove={onMouseMoveCanvas}
      >
        <Layer>
          {segments.map((segment) => (
            <DrawSegment key={segment.key()} segment={segment} />
          ))}
          {selectedPoint && mousePosition && (
            <DrawSegment
              dashed
              segment={
                new Segment(selectedPoint, hoveredPoint ?? mousePosition)
              }
            />
          )}
          {points.map((point, index) => (
            <DrawPoint
              key={index}
              point={point}
              isSelected={!!selectedPoint?.equals(point)}
              isHovered={!!hoveredPoint?.equals(point)}
              onDragStart={startDraggingPoint}
              onDragMove={onDragMovePoint}
              onDragEnd={onDragEndPoint}
            />
          ))}
        </Layer>
      </Stage>
      <div
        css={css`
          display: flex;
          gap: 20px;
        `}
      >
        Controls
      </div>
    </div>
  );
};
