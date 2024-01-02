import { memo, ReactNode } from 'react';
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
  const { onDragEndCanvas, origin, isStageDraggable, scale } =
    useViewportContext();

  const {
    onMouseMoveCanvas,
    onWheelCanvas,
    onClickCanvas,
    onContextMenuCanvas,
  } = useGraphEditorContext();

  return (
    <Stage
      draggable={isStageDraggable}
      x={origin.x}
      y={origin.y}
      scale={scale}
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
