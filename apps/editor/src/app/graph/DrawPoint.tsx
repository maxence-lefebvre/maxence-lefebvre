import { Point } from '@feyroads/math/graph';
import { memo } from 'react';
import { Circle } from 'react-konva';

export type DrawPointProps = {
  point: Point;
};

export const DrawPoint = memo(function DrawPoint({ point }: DrawPointProps) {
  return <Circle x={point.x} y={point.y} radius={9} fill="black" />;
});
