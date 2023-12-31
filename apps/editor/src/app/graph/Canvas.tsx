import { memo, ReactNode } from 'react';
import { GraphEditor, Viewport } from './types';
import { css } from '@emotion/react';
import { Stage } from 'react-konva';

export type CanvasProps = {
  viewport: Viewport;
  graphEditor: GraphEditor;
  children: ReactNode;
  isHoveringPoint: boolean;
};
export const Canvas = memo(function Canvas({
  viewport,
  graphEditor,
  children,
  isHoveringPoint,
}: CanvasProps) {
  const { onDragEndCanvas, origin, isStageDraggable, scale } = viewport;
  const {
    onMouseMoveCanvas,
    onWheelCanvas,
    onClickCanvas,
    onContextMenuCanvas,
  } = graphEditor;

  return (
    <Stage
      draggable={isStageDraggable}
      x={origin.x}
      y={origin.y}
      scale={scale}
      width={1200}
      height={1000}
      css={[
        css`
          width: 1200px;
          height: 1000px;
          background-color: #2a5;
        `,
        isHoveringPoint &&
          css`
            cursor: move;
          `,
      ]}
      onDragEnd={onDragEndCanvas}
      onClick={onClickCanvas}
      onContextMenu={onContextMenuCanvas}
      onMouseMove={onMouseMoveCanvas}
      onWheel={onWheelCanvas}
    >
      {children}
    </Stage>
  );
});
