import { Envelope, Point, Polygon } from '@feyroads/math/graph';
import { defaultsDeep } from 'lodash';
import { WithBasePolygon } from './types';

export type BuildingGraphicOptions = {
  height: number;
};

export const defaultBuildingGraphicOptions: BuildingGraphicOptions = {
  height: 200,
};

export class Building implements WithBasePolygon {
  public readonly graphicOptions: BuildingGraphicOptions;

  public readonly base: Polygon;

  public constructor(
    envelope: Envelope,
    graphicOptions?: Partial<BuildingGraphicOptions>,
  ) {
    this.base = envelope.polygon;

    this.graphicOptions = defaultsDeep(
      graphicOptions,
      defaultBuildingGraphicOptions,
    );
  }

  hash() {
    return JSON.stringify(this);
  }

  getBuildingCeiling(viewportCenter: Point) {
    return new Polygon(
      this.base.points.map((point) =>
        point.getFake3DProjection(viewportCenter, this.graphicOptions.height),
      ),
    );
  }

  getBuildingSides(ceiling: Polygon, viewportCenter: Point) {
    const basePoints = this.base.points;
    const ceilingPoints = ceiling.points;

    const sides = basePoints.flatMap((basePoint, index) => {
      const nextIndex = (index + 1) % basePoints.length;

      const ceilingPoint = ceilingPoints[index];
      const nextBasePoint = basePoints[nextIndex];
      const nextCeilingPoint = ceilingPoints[nextIndex];

      return [
        new Polygon([basePoint, nextBasePoint, nextCeilingPoint, ceilingPoint]),
      ];
    });

    return sides.toSorted(
      (a, b) =>
        b.distanceToPoint(viewportCenter) - a.distanceToPoint(viewportCenter),
    );
  }

  getBuildingRoof(ceiling: Polygon, viewportCenter: Point) {
    const ceilingPoints = ceiling.points;

    const [baseA, baseB, baseC, baseD] = this.base.points;
    const baseMidpoints = [baseA.average(baseB), baseC.average(baseD)];
    const ceilingMidpoints = baseMidpoints.map((point) =>
      point.getFake3DProjection(viewportCenter, this.graphicOptions.height),
    );

    const roof = [
      new Polygon([
        ceilingPoints[0],
        ceilingPoints[3],
        ceilingMidpoints[1],
        ceilingMidpoints[0],
      ]),
      new Polygon([
        ceilingPoints[2],
        ceilingPoints[1],
        ceilingMidpoints[0],
        ceilingMidpoints[1],
      ]),
    ];

    return roof.toSorted(
      (a, b) =>
        b.distanceToPoint(viewportCenter) - a.distanceToPoint(viewportCenter),
    );
  }
}
