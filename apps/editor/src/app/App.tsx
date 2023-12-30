import { css } from '@emotion/react';
import { Layer, Stage } from 'react-konva';
import { DrawPoint } from './graph/DrawPoint';
import { DrawSegment } from './graph/DrawSegment';
import { useGraphEditor } from './graph/useGraphEditor';
import { useCallback, useState } from 'react';

export const App = () => {
  const {
    graph,
    scale,
    selectedPoint,
    hoveredPoint,
    creatingSegment,
    onClickCanvas,
    onContextMenuCanvas,
    onMouseMoveCanvas,
    onWheelCanvas,
    onDragStartPoint,
    onDragMovePoint,
    onDragEndPoint,
  } = useGraphEditor();

  const [isHoveringPoint, setIsHoveringPoint] = useState(false);

  const { segments, points } = graph;

  const onMouseEnterPoint = useCallback(() => setIsHoveringPoint(true), []);
  const onMouseLeavePoint = useCallback(() => setIsHoveringPoint(false), []);

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
        scaleX={scale}
        scaleY={scale}
        width={600}
        height={600}
        css={[
          css`
            width: 600px;
            height: 600px;
            background-color: #2a5;
          `,
          isHoveringPoint &&
            css`
              cursor: move;
            `,
        ]}
        onClick={onClickCanvas}
        onContextMenu={onContextMenuCanvas}
        onMouseMove={onMouseMoveCanvas}
        onWheel={onWheelCanvas}
      >
        <Layer>
          {segments.map((segment) => (
            <DrawSegment key={segment.key()} segment={segment} />
          ))}
          {creatingSegment && <DrawSegment dashed segment={creatingSegment} />}
          {points.map((point, index) => (
            <DrawPoint
              key={index}
              point={point}
              isSelected={!!selectedPoint?.equals(point)}
              isHovered={!!hoveredPoint?.equals(point)}
              draggable={!selectedPoint}
              onDragStart={onDragStartPoint}
              onDragMove={onDragMovePoint}
              onDragEnd={onDragEndPoint}
              onMouseEnter={onMouseEnterPoint}
              onMouseLeave={onMouseLeavePoint}
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
