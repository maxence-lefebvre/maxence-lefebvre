import { memo } from 'react';
import { World } from '@feyroads/world/core';
import { Layer } from 'react-konva';
import {
  DrawEnvelope,
  DrawPoint,
  DrawPolygon,
  DrawSegment,
} from '@feyroads/math/components';
import { Viewport } from '@feyroads/editor/viewport/components';

export type DrawDebugProps = {
  enabled?: boolean;
  world: World;
  viewport: Viewport;
};

export const DrawDebug = memo(function DrawDebug({
  enabled = false,
  world,
  viewport,
}: DrawDebugProps) {
  if (!enabled) {
    return null;
  }

  const { debug, trees } = world;

  return (
    <Layer opacity={0.6}>
      {debug.roadsThickEnvelopes.map((building, index) => (
        <DrawEnvelope
          key={index}
          envelope={building}
          stroke="transparent"
          fill="rgba(255,0,0,.2)"
        />
      ))}
      {debug.buildingGuides.map((guide) => (
        <DrawSegment
          segment={guide}
          key={guide.hash()}
          stroke="rgba(255,0,0,.5)"
          strokeWidth={4}
        />
      ))}
      {debug.buildingSupports.map((guide) => (
        <DrawSegment
          segment={guide}
          key={guide.hash()}
          stroke="rgba(255,255, 0,.5)"
          strokeWidth={4}
        />
      ))}
      {debug.buildingBases.map((base, index) => (
        <DrawEnvelope
          envelope={base}
          key={index}
          fill="rgba(255,255, 0,.5)"
          stroke="transparent"
        />
      ))}
      {trees.map((tree) => (
        <DrawPolygon
          polygon={tree.base.polygon}
          key={tree.hash()}
          fill="rgba(255,50,0,.5)"
          stroke="transparent"
        />
      ))}
      <DrawPoint point={viewport.center} width={40} fill="red" />
    </Layer>
  );
});
