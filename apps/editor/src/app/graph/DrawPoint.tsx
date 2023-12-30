import { Point } from '@feyroads/math/graph';
import { ComponentPropsWithoutRef, Fragment, memo } from 'react';
import { Arc, Circle, Shape } from 'react-konva';
import { KonvaNodeEvents } from 'react-konva/ReactKonvaCore';

export type DrawPointProps = ComponentPropsWithoutRef<typeof Circle> & {
  point: Point;
  isSelected?: boolean;
  isHovered?: boolean;
};

const RADIUS = 9;

export const DrawPoint = memo(function DrawPoint({
  point,
  isSelected = false,
  isHovered = false,
  onDragStart,
  onDragMove,
  onDragEnd,
  ...props
}: DrawPointProps) {
  const dragProps = {
    draggable: !!onDragStart,
    onDragStart,
    onDragMove,
    onDragEnd,
  };

  return (
    <Fragment>
      <Circle x={point.x} y={point.y} radius={RADIUS} fill="black" {...props} />
      {isSelected && (
        <Arc
          x={point.x}
          y={point.y}
          angle={360}
          innerRadius={RADIUS * 0.6}
          outerRadius={RADIUS * 0.6 + 0.1}
          stroke="yellow"
        />
      )}
      {(isHovered || point.isDragging) && (
        <Circle
          x={point.x}
          y={point.y}
          radius={RADIUS * 0.4}
          fill="yellow"
          {...dragProps}
        />
      )}
    </Fragment>
  );
});
