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
          fill="#BBB"
          stroke="#BBB"
          strokeWidth={15}
        />
      ))}
      {world.graph.segments.map((segment) => (
        <DrawSegment
          key={segment.key()}
          dash={[10, 10]}
          width={4}
          stroke="white"
          segment={segment}
        />
      ))}
      {world.roadBorders.map((segment) => (
        <DrawSegment
          key={segment.key()}
          segment={segment}
          stroke="white"
          width={4}
        />
      ))}
      {world.buildings.map((building, index) => (
        <DrawEnvelope key={index} envelope={building} />
      ))}
      {world.guides.map((guide) => (
        <DrawSegment segment={guide} key={guide.key()} />
      ))}
    </Fragment>
  );
});
