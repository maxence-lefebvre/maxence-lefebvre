import { css } from '@emotion/react';
import { useGraph } from './graph/useGraph';
import { Layer, Stage } from 'react-konva';
import { DrawPoint } from './graph/DrawPoint';
import { DrawSegment } from './graph/DrawSegment';
import { useCallback, useState } from 'react';
import { Point, Segment } from '@feyroads/math/graph';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';
import { useGraphEditor } from './graph/useGraphEditor';

export const App = () => {
  const {
    graph,
    selectedPoint,
    hoveredPoint,
    creatingSegment,
    onClickCanvas,
    onContextMenuCanvas,
    onMouseMoveCanvas,
    onDragStartPoint,
    onDragMovePoint,
    onDragEndPoint,
  } = useGraphEditor();

  const { segments, points } = graph;

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
        onContextMenu={onContextMenuCanvas}
        onMouseMove={onMouseMoveCanvas}
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
              onDragStart={
                /* disable drag if a point is selected */ selectedPoint
                  ? undefined
                  : onDragStartPoint
              }
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
