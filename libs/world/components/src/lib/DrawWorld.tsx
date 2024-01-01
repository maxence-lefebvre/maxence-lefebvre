import { Fragment, memo } from 'react';
import { World } from '@feyroads/world/core';
import {
  DrawEnvelope,
  DrawPoint,
  DrawSegment,
} from '@feyroads/math/components';

export type DrawWorldProps = {
  world: World;
};

export const DrawWorld = memo(function DrawWorld({ world }: DrawWorldProps) {
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
      {world.buildings.map((building, index) => (
        <DrawEnvelope
          key={index}
          envelope={building}
          fill="brown"
          stroke="brown"
        />
      ))}
      {world.trees.map((tree) => {
        return (
          <DrawPoint
            point={tree}
            key={tree.hash()}
            fill="rgba(0,255, 0, .8)"
            stroke="rgba(0,255, 0, .8)"
            width={world.graphicOptions.trees.size}
          />
        );
      })}
    </Fragment>
  );
});
