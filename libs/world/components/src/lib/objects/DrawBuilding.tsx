import { memo } from 'react';
import { Building } from '@feyroads/world/core';
import { DrawPolygon } from '@feyroads/math/components';

export type DrawBuildingProps = {
  building: Building;
};

export const DrawBuilding = memo(function DrawBuilding({
  building,
}: DrawBuildingProps) {
  return <DrawPolygon polygon={building.base} fill="brown" stroke="brown" />;
});
