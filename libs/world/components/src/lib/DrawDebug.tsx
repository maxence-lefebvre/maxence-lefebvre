import { memo } from 'react';
import { World } from '@feyroads/world/core';
import { Layer } from 'react-konva';
import { DrawEnvelope, DrawSegment } from '@feyroads/math/components';

export type DrawDebugProps = {
  enabled?: boolean;
  world: World;
};

export const DrawDebug = memo(function DrawDebug({
  enabled = false,
  world,
}: DrawDebugProps) {
  if (!enabled) {
    return null;
  }

  const { debug } = world;

  return (
    <Layer opacity={0.6}>
      {debug.thickEnvelopes.map((building, index) => (
        <DrawEnvelope
          key={index}
          envelope={building}
          stroke="transparent"
          fill="rgba(255,0,0,.2)"
        />
      ))}
      {debug.guides.map((guide) => (
        <DrawSegment
          segment={guide}
          key={guide.key()}
          stroke="red"
          strokeWidth={5}
        />
      ))}
    </Layer>
  );
});
