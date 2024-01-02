import { Fragment, memo, useMemo } from 'react';
import { Building } from '@feyroads/world/core';
import { DrawPolygon } from '@feyroads/math/components';
import { useViewportContext } from '@feyroads/editor/viewport/components';

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
        fill="rgba(0,0,0,0.2)"
        stroke="#AAA"
        strokeWidth={20}
      />
      {sides.map((side) => (
        <DrawPolygon
          key={side.hash()}
          polygon={side}
          fill="white"
          stroke="#AAA"
        />
      ))}
      <DrawPolygon
        polygon={building.getBuildingCeiling(viewportCenter)}
        fill="white"
        stroke="#AAA"
        strokeWidth={6}
      />
      {roof.map((side) => (
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
