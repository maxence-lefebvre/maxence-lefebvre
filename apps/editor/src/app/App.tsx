import { css } from '@emotion/react';
import { useGraph } from './graph/useGraph';
import { Layer, Stage } from 'react-konva';
import { DrawPoint } from './graph/DrawPoint';
import { DrawSegment } from './graph/DrawSegment';
import { useCallback } from 'react';
import { Point } from '@feyroads/math/graph';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';

export const App = () => {
  const { graph, addPoint } = useGraph();
  const { segments, points } = graph;

  const onClickCanvas: NonNullable<KonvaNodeEvents['onClick']> = useCallback(
    (event) => {
      const { evt } = event;
      const { offsetX, offsetY } = evt;
      addPoint(new Point(offsetX, offsetY));
    },
    [addPoint]
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
      >
        <Layer>
          {segments.map((segment) => (
            <DrawSegment key={segment.key()} segment={segment} />
          ))}
          {points.map((point) => (
            <DrawPoint key={point.key()} point={point} />
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
