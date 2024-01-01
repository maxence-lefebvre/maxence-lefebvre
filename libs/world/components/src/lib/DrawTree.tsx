import { memo } from 'react';
import { Tree } from '@feyroads/world/core';
import { DrawPoint } from '@feyroads/math/components';
import { Viewport } from '@feyroads/editor/viewport/components';

export type DrawTreeProps = {
  tree: Tree;

  viewport: Viewport;
};

export const DrawTree = memo(function DrawTree({ tree }: DrawTreeProps) {
  return (
    <DrawPoint
      point={tree.center}
      fill="rgba(0,255, 0, .8)"
      stroke="rgba(0,255, 0, .8)"
      width={tree.graphicOptions.size}
    />
  );
});
