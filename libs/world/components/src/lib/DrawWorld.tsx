import { Fragment, memo, useMemo } from 'react';
import { Building, WithBasePolygon, World } from '@feyroads/world/core';
import { DrawEnvelope, DrawSegment } from '@feyroads/math/components';
import { DrawTree, DrawBuilding } from './objects';
import { useViewportContext } from '@feyroads/editor/viewport/components';

export type DrawWorldProps = {
  world: World;
};

export const DrawWorld = memo(function DrawWorld({ world }: DrawWorldProps) {
  const { center: viewportCenter } = useViewportContext();

  const { roads, buildings, trees } = world;

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
