import { useViewportContext } from '@feyroads/editor/viewport/state';
import {
  DrawEnvelope,
  DrawPoint,
  DrawPolygon,
  DrawSegment,
} from '@feyroads/math/components';
import { useWorldContext } from '@feyroads/world/state';
import { memo } from 'react';
import { Layer } from 'react-konva';

export type DrawDebugProps = {
  enabled?: boolean;
};

export const DrawDebug = memo(function DrawDebug({
  enabled = false,
}: DrawDebugProps) {
  const { debug, trees } = useWorldContext();
  const { center: viewportCenter } = useViewportContext();

  if (!enabled) {
    return null;
  }

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
          polygon={tree.base}
          key={tree.hash()}
          fill="rgba(255,50,0,.5)"
          stroke="transparent"
        />
      ))}
      <DrawPoint point={viewportCenter} width={40} fill="red" />
    </Layer>
  );
});
