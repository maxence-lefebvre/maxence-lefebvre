import { Fragment, memo } from 'react';
import { World } from '@feyroads/world/core';
import { DrawEnvelope, DrawSegment } from '@feyroads/math/components';

export type DrawWorldProps = {
  world: World;
};

export const DrawWorld = memo(function DrawWorld({ world }: DrawWorldProps) {
  return (
    <Fragment>
      {world.envelopes.map((envelope, index) => (
        <DrawEnvelope
          key={index}
          envelope={envelope}
          fill="rgba(0,0,255,.3)"
          stroke="blue"
          strokeWidth={15}
        />
      ))}
      {world.graph.segments.map((segment, index) => (
        <DrawSegment
          key={segment.key()}
          dash={[10, 10]}
          width={4}
          stroke="white"
          segment={segment}
        />
      ))}
    </Fragment>
  );
});
