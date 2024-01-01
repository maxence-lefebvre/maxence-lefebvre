import { Point } from '@feyroads/math/graph';
import { defaultsDeep } from 'lodash';

export type TreeGraphicOptions = {
  size: number;
  heightCoefficient: number;
};

export const defaultTreeGraphicOptions = {
  size: 160,
  heightCoefficient: 0.3,
};

export class Tree {
  public readonly graphicOptions: TreeGraphicOptions;

  constructor(
    public readonly center: Point,
    graphicOptions?: TreeGraphicOptions,
  ) {
    this.graphicOptions = defaultsDeep(
      graphicOptions,
      defaultTreeGraphicOptions,
    );
  }

  public hash() {
    return this.center.hash();
  }
}
