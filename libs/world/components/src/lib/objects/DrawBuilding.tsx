import { useViewportContext } from '@feyroads/editor/viewport/state';
import { DrawPolygon } from '@feyroads/math/components';
import { Building } from '@feyroads/world/core';
import { map } from 'lodash';
import { Fragment, memo, useMemo } from 'react';

export type DrawBuildingProps = {
  building: Building;
};

export const DrawBuilding = memo(function DrawBuilding({
  building,
}: DrawBuildingProps) {
  const { center: viewportCenter } = useViewportContext();

  const ceiling = useMemo(
    () => building.getBuildingCeiling(viewportCenter),
    [building, viewportCenter],
  );

  const sides = useMemo(
    () => building.getBuildingSides(ceiling, viewportCenter),
    [building, ceiling, viewportCenter],
  );

  const roof = useMemo(
    () => building.getBuildingRoof(ceiling, viewportCenter),
    [building, ceiling, viewportCenter],
  );

  return (
    <Fragment>
      <DrawPolygon
        polygon={building.base}
        fill="white"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth={20}
      />
      {map(sides, (side) => (
        <DrawPolygon
          key={side.hash()}
          polygon={side}
          fill="lightpink"
          stroke="#AAA"
        />
      ))}
      <DrawPolygon
        polygon={building.getBuildingCeiling(viewportCenter)}
        fill="lightpink"
        stroke="lightpink"
        strokeWidth={6}
      />
      {map(roof, (side) => (
        <DrawPolygon
          key={side.hash()}
          polygon={side}
          fill="#D44"
          stroke="#C44"
          strokeWidth={8}
          lineJoin="round"
        />
      ))}
    </Fragment>
  );
});
