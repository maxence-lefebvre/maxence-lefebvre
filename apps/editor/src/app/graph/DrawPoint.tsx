import { Point } from '@feyroads/math/graph';
import { Fragment, memo } from 'react';
import { Arc, Circle, Shape } from 'react-konva';

export type DrawPointProps = {
  point: Point;
  isSelected?: boolean;
  isHovered?: boolean;
};

const RADIUS = 9;

export const DrawPoint = memo(function DrawPoint({
  point,
  isSelected = false,
  isHovered = false,
}: DrawPointProps) {
  return (
    <Fragment>
      <Circle x={point.x} y={point.y} radius={RADIUS} fill="black" />
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
      {isHovered && (
        <Circle x={point.x} y={point.y} radius={RADIUS * 0.4} fill="yellow" />
      )}
    </Fragment>
  );
});
