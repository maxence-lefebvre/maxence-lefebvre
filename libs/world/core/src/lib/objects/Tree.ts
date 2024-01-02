import { Point, Polygon } from '@feyroads/math/graph';
import { defaultsDeep } from 'lodash';
import { linearInterpolation } from '@feyroads/math/core';
import { WithBasePolygon } from './types';

export type TreeGraphicOptions = {
  size: number;
  height: number;
  levelCount: number;
};

export const defaultTreeGraphicOptions = {
  size: 160,
  height: 150,
  levelCount: 7,
};

export type TreeLevelBase = {
  t: number;
  color: string;
  noisyRadiuses: { angle: number; radius: number }[];
};

export type TreeLevel = {
  color: string;
  polygon: Polygon;
};

export class Tree implements WithBasePolygon {
  public readonly graphicOptions: TreeGraphicOptions;

  public readonly base: Polygon;

  private readonly levelBases: TreeLevelBase[] = [];

  constructor(
    public readonly center: Point,
    graphicOptions?: Partial<TreeGraphicOptions>,
  ) {
    this.graphicOptions = defaultsDeep(
      graphicOptions,
      defaultTreeGraphicOptions,
    );

    this.base = this.generateLevelPolygon(
      this.center,
      this.graphicOptions.size,
    );

    for (let i = 0; i < this.graphicOptions.levelCount; i++) {
      const t = i / (this.graphicOptions.levelCount - 1);
      const color = `rgb(30, ${linearInterpolation(50, 200, t)}, 70)`;
      const radius = linearInterpolation(this.graphicOptions.size, 40, t) / 2;

      const noisyRadiuses: TreeLevelBase['noisyRadiuses'] = [];

      for (let a = 0; a < 2 * Math.PI; a += Math.PI / 16) {
        noisyRadiuses.push({
          angle: a,
          radius: radius * linearInterpolation(0.5, 1, Math.random()),
        });
      }

      this.levelBases.push({
        t,
        color,
        noisyRadiuses,
      });
    }
  }

  public hash() {
    return this.center.hash();
  }

  public getTreeTop(viewportCenter: Point) {
    return this.center.getFake3DProjection(
      viewportCenter,
      this.graphicOptions.height,
    );
  }

  public getTreeLevels(viewportCenter: Point): TreeLevel[] {
    const treeTop = this.getTreeTop(viewportCenter);

    return [
      { color: 'rgb(30, 50, 70)', polygon: this.base },
      ...this.levelBases.map((levelBase) => {
        const center = this.center.linearInterpolation(treeTop, levelBase.t);

        const polygon = new Polygon(
          levelBase.noisyRadiuses.map((noisyRadius) =>
            center.translate(noisyRadius.angle, noisyRadius.radius),
          ),
        );

        return {
          color: levelBase.color,
          polygon,
        };
      }),
    ];
  }

  public generateLevelPolygon(point: Point, size: number) {
    const points = [];
    const radius = size / 2;

    for (let a = 0; a < 2 * Math.PI; a += Math.PI / 16) {
      const noisyRadius = radius * linearInterpolation(0.5, 1, Math.random());
      points.push(point.translate(a, noisyRadius));
    }

    return new Polygon(points);
  }
}
