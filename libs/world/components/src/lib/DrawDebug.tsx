import { useViewportContext } from '@feyroads/editor/viewport/state';
import { useDebugModeContext } from '@feyroads/kernel/debug';
import {
  DrawEnvelope,
  DrawPoint,
  DrawPolygon,
  DrawSegment,
} from '@feyroads/math/components';
import { useWorldContext } from '@feyroads/world/state';
import { map } from 'lodash';
import { memo } from 'react';
import { Layer } from 'react-konva';

export const DrawDebug = memo(function DrawDebug() {
  const { isDebugMode } = useDebugModeContext();
  const { debug, trees } = useWorldContext();
  const { center: viewportCenter } = useViewportContext();

  if (!isDebugMode) {
    return null;
  }

  const {
    buildingBases,
    buildingGuides,
    buildingSupports,
    roadsThickEnvelopes,
  } = debug;

  return (
    <Layer opacity={0.6}>
      {map(roadsThickEnvelopes, (building, index) => (
        <DrawEnvelope
          key={index}
          envelope={building}
          stroke="transparent"
          fill="rgba(255,0,0,.2)"
        />
      ))}
      {map(buildingGuides, (guide) => (
        <DrawSegment
          segment={guide}
          key={guide.hash()}
          stroke="rgba(255,0,0,.5)"
          strokeWidth={4}
        />
      ))}
      {map(buildingSupports, (guide) => (
        <DrawSegment
          segment={guide}
          key={guide.hash()}
          stroke="rgba(255,255, 0,.5)"
          strokeWidth={4}
        />
      ))}
      {map(buildingBases, (base, index) => (
        <DrawEnvelope
          envelope={base}
          key={index}
          fill="rgba(255,255, 0,.5)"
          stroke="transparent"
        />
      ))}
      {map(trees, (tree) => (
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
