import { Segment } from '@feyroads/math/graph';
import { memo } from 'react';
import { Line } from 'react-konva';

export type DrawSegmentProps = {
  segment: Segment;
};

export const DrawSegment = memo(function ({ segment }: DrawSegmentProps) {
  const { p1, p2 } = segment;

  return <Line points={[p1.x, p1.y, p2.x, p2.y]} stroke="black" width={2} />;
});
