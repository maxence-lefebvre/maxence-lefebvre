import { Polygon } from '@feyroads/math/graph';
import Konva from 'konva';
import { forEach } from 'lodash';
import { ComponentPropsWithoutRef, memo, useCallback } from 'react';
import { Shape } from 'react-konva';

export type DrawPolygonProps = ComponentPropsWithoutRef<typeof Shape> & {
  polygon: Polygon;
};

export const DrawPolygon = memo(function DrawPolygon({
  polygon,
  ...props
}: DrawPolygonProps) {
  const { points } = polygon;

  const scene = useCallback(
    (ctx: Konva.Context, shape: Konva.Shape) => {
      ctx.beginPath();

      const [startPoint, ...restPoints] = points;
      ctx.moveTo(startPoint.x, startPoint.y);
      forEach(restPoints, ({ x, y }) => ctx.lineTo(x, y));

      ctx.closePath();
      ctx.fillStrokeShape(shape);
    },
    [points],
  );

  return (
    <Shape
      fill="rgba(0,0,255,.3)"
      stroke="blue"
      sceneFunc={scene}
      lineJoin="miter"
      {...props}
    />
  );
});
