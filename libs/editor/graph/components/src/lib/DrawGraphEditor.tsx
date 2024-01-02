import { memo } from 'react';
import {
  DrawPoint,
  DrawSegment,
  useGraphStateContext,
} from '@feyroads/math/components';
import { Layer } from 'react-konva';
import { useGraphEditorContext } from './useGraphEditorContext';

export type DrawGraphEditorProps = {
  onMouseEnterPoint: VoidFunction;
  onMouseLeavePoint: VoidFunction;
};

export const DrawGraphEditor = memo(function DrawGraphEditor({
  onMouseEnterPoint,
  onMouseLeavePoint,
}: DrawGraphEditorProps) {
  const { graph, hoveredPoint, selectedPoint } = useGraphStateContext();
  const { onDragMovePoint, onDragStartPoint, creatingSegment, onDragEndPoint } =
    useGraphEditorContext();

  const { points } = graph;

  return (
    <Layer opacity={0.5}>
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
  );
});
