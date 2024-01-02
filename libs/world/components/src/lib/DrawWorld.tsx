import { Fragment, memo, useMemo } from 'react';
import { Building, WithBasePolygon } from '@feyroads/world/core';
import { DrawEnvelope, DrawSegment } from '@feyroads/math/components';
import { DrawBuilding, DrawTree } from './objects';
import { useViewportContext } from '@feyroads/editor/viewport/state';
import { useWorldContext } from '@feyroads/world/state';

export const DrawWorld = memo(function DrawWorld() {
  const { roads, buildings, trees } = useWorldContext();
  const { center: viewportCenter } = useViewportContext();

  const items = useMemo(
    () =>
      [...buildings, ...trees].toSorted(
        (a: WithBasePolygon, b: WithBasePolygon) => {
          return (
            b.base.distanceToPoint(viewportCenter) -
            a.base.distanceToPoint(viewportCenter)
          );
        },
      ),
    [buildings, trees, viewportCenter],
  );

  return (
    <Fragment>
      {roads.surfaces.map((envelope, index) => (
        <DrawEnvelope
          key={index}
          envelope={envelope}
          fill="#BBB"
          stroke="#BBB"
          strokeWidth={15}
        />
      ))}
      {roads.medianLines.map((segment) => (
        <DrawSegment
          key={segment.hash()}
          dash={[10, 10]}
          width={4}
          stroke="white"
          segment={segment}
        />
      ))}
      {roads.borders.map((segment) => (
        <DrawSegment
          key={segment.hash()}
          segment={segment}
          stroke="white"
          width={4}
        />
      ))}
      {items.map((item) => {
        return item instanceof Building ? (
          <DrawBuilding key={item.hash()} building={item} />
        ) : (
          <DrawTree key={item.hash()} tree={item} />
        );
      })}
    </Fragment>
  );
});
