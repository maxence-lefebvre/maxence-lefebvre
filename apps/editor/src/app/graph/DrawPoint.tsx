import { Point } from '@feyroads/math/graph';
import { Fragment, memo } from 'react';
import { Arc, Circle, Shape } from 'react-konva';

export type DrawPointProps = {
  point: Point;
  isSelected?: boolean;
};

export const DrawPoint = memo(function DrawPoint({
  point,
  isSelected = false,
}: DrawPointProps) {
  return (
    <Fragment>
      <Circle x={point.x} y={point.y} radius={9} fill="black" />
      {isSelected && (
        <Arc
          x={point.x}
          y={point.y}
          angle={360}
          innerRadius={5}
          outerRadius={5.1}
          stroke="yellow"
        />
      )}
    </Fragment>
  );
});
