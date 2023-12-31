import { memo } from 'react';
import { GraphEditor, GraphState } from './types';
import { DrawPoint, DrawSegment } from '@feyroads/math/components';
import { Layer } from 'react-konva';

export type DrawGraphEditorProps = {
  graphState: GraphState;
  graphEditor: GraphEditor;

  onMouseEnterPoint: VoidFunction;
  onMouseLeavePoint: VoidFunction;
};

export const DrawGraphEditor = memo(function DrawGraphEditor({
  graphState,
  graphEditor,
  onMouseEnterPoint,
  onMouseLeavePoint,
}: DrawGraphEditorProps) {
  const { graph, hoveredPoint, selectedPoint } = graphState;
  const { onDragMovePoint, onDragStartPoint, creatingSegment, onDragEndPoint } =
    graphEditor;

  const { points } = graph;

  return (
    <Layer>
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
