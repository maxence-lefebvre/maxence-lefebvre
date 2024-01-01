import { Fragment, memo, useMemo } from 'react';
import { Tree } from '@feyroads/world/core';
import { DrawPolygon } from '@feyroads/math/components';
import { Viewport } from '@feyroads/editor/viewport/components';

export type DrawTreeProps = {
  tree: Tree;
  viewport: Viewport;
};

export const DrawTree = memo(function DrawTree({
  tree,
  viewport: { center: viewportCenter },
}: DrawTreeProps) {
  const levels = useMemo(
    () => tree.getTreeLevels(viewportCenter),
    [tree, viewportCenter],
  );

  return (
    <Fragment>
      {levels.map(({ color, polygon }) => {
        return (
          <DrawPolygon
            polygon={polygon}
            key={polygon.hash()}
            fill={color}
            stroke="transparent"
          />
        );
      })}
    </Fragment>
  );
});
