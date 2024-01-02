import { Fragment, memo } from 'react';
import { World } from '@feyroads/world/core';
import { DrawEnvelope, DrawSegment } from '@feyroads/math/components';
import { DrawTree, DrawBuilding } from './objects';
import { Viewport } from '@feyroads/editor/viewport/components';

export type DrawWorldProps = {
  world: World;
  viewport: Viewport;
};

export const DrawWorld = memo(function DrawWorld({
  world,
  viewport,
}: DrawWorldProps) {
  return (
    <Fragment>
      {world.roads.surfaces.map((envelope, index) => (
        <DrawEnvelope
          key={index}
          envelope={envelope}
          fill="#BBB"
          stroke="#BBB"
          strokeWidth={15}
        />
      ))}
      {world.roads.medianLines.map((segment) => (
        <DrawSegment
          key={segment.hash()}
          dash={[10, 10]}
          width={4}
          stroke="white"
          segment={segment}
        />
      ))}
      {world.roads.borders.map((segment) => (
        <DrawSegment
          key={segment.hash()}
          segment={segment}
          stroke="white"
          width={4}
        />
      ))}
      {world.buildings.map((building) => (
        <DrawBuilding key={building.hash()} building={building} />
      ))}
      {world.trees.map((tree) => {
        return <DrawTree tree={tree} key={tree.hash()} viewport={viewport} />;
      })}
    </Fragment>
  );
});
