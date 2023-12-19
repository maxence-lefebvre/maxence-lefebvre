import { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { usePoints } from './graph/usePoints';
import { useSegments } from './graph/useSegments';
import { useGraph } from './graph/useGraph';

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { points, addRandomPoint, removeRandomPoint, removeAllPoints } = usePoints();
  const { segments, addRandomSegment, removeRandomSegment } =
    useSegments(points);
  const { graph } = useGraph(points, segments);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.height, canvas.width);

    graph.draw(ctx);
  }, [graph]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 20px;

        align-items: center;
      `}
    >
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        css={css`
          width: 600px;
          height: 600px;
          background-color: #2a5;
        `}
      />
      <div
        css={css`
          display: flex;
          gap: 20px;
        `}
      >
        <button onClick={addRandomPoint}> Add Point </button>
        <button onClick={removeRandomPoint}> Remove Point </button>
        <button onClick={addRandomSegment}> Add Segment </button>
        <button onClick={removeRandomSegment}> Remove Segment </button>
        <button onClick={removeAllPoints}> Remove All </button>
      </div>
    </div>
  );
};
