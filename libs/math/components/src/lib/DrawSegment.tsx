import { Segment } from '@feyroads/math/graph';
import { ComponentPropsWithoutRef, memo } from 'react';
import { Line } from 'react-konva';

export type DrawSegmentProps = ComponentPropsWithoutRef<typeof Line> & {
  dashed?: boolean;
  segment: Segment;
};

export const DrawSegment = memo(function ({
  segment,
  dashed = false,
  ...props
}: DrawSegmentProps) {
  const { p1, p2 } = segment;

  return (
    <Line
      points={[p1.x, p1.y, p2.x, p2.y]}
      stroke="black"
      width={2}
      {...(dashed && { dash: [3, 3] })}
      {...props}
    />
  );
});
