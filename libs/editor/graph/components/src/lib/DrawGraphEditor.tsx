import { useAppCanvasContext } from '@feyroads/canvas/state';
import { useGraphEditorContext } from '@feyroads/editor/graph/state';
import { DrawPoint, DrawSegment } from '@feyroads/math/components';
import { useGraphStateContext } from '@feyroads/math/state';
import { map } from 'lodash';
import { memo } from 'react';
import { Layer } from 'react-konva';

export const DrawGraphEditor = memo(function DrawGraphEditor() {
  const { graph, hoveredPoint, selectedPoint } = useGraphStateContext();
  const { onDragMovePoint, onDragStartPoint, creatingSegment, onDragEndPoint } =
    useGraphEditorContext();
  const { onMouseEnterPoint, onMouseLeavePoint } = useAppCanvasContext();

  const { points } = graph;

  return (
    <Layer opacity={0.5}>
      {creatingSegment && <DrawSegment dashed segment={creatingSegment} />}

      {map(points, (point, index) => (
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
