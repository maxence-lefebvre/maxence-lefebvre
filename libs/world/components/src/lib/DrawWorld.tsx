import { Fragment, memo } from 'react';
import { World } from '@feyroads/world/core';
import { DrawEnvelope } from '@feyroads/math/components';

export type DrawWorldProps = {
  world: World;
};

export const DrawWorld = memo(function DrawWorld({ world }: DrawWorldProps) {
  return (
    <Fragment>
      {world.envelopes.map((envelope) => (
        <DrawEnvelope envelope={envelope} />
      ))}
    </Fragment>
  );
});
