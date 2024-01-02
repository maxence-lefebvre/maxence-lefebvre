import { memo, ReactNode, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Stage } from 'react-konva';
import { useViewportContext } from '@feyroads/editor/viewport/components';
import { useGraphEditorContext } from './useGraphEditorContext';

export type CanvasProps = {
  isHoveringPoint: boolean;
  children: ReactNode;
};
export const Canvas = memo(function Canvas({
  children,
  isHoveringPoint,
}: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    canvasRef,
    onDragEndCanvas,
    onDragMoveCanvas,
    origin,
    isStageDraggable,
    scale,
  } = useViewportContext();

  const {
    onMouseMoveCanvas,
    onWheelCanvas,
    onClickCanvas,
    onContextMenuCanvas,
  } = useGraphEditorContext();

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      css={css`
        flex: 1 0 auto;
        width: 100%;
      `}
    >
      {dimensions.width !== 0 && dimensions.height !== 0 && (
        <Stage
          ref={canvasRef}
          draggable={isStageDraggable}
          x={origin.x}
          y={origin.y}
          scale={scale}
          width={dimensions.width}
          height={dimensions.height}
          css={[
            css`
              width: 100%;
              height: 100%;
              background-color: #2a5;
            `,
            isHoveringPoint &&
              css`
                cursor: move;
              `,
          ]}
          onDragMove={onDragMoveCanvas}
          onDragEnd={onDragEndCanvas}
          onClick={onClickCanvas}
          onContextMenu={onContextMenuCanvas}
          onMouseMove={onMouseMoveCanvas}
          onWheel={onWheelCanvas}
        >
          {children}
        </Stage>
      )}
    </div>
  );
});
