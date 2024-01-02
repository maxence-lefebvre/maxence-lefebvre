import { Fragment, memo, useMemo } from 'react';
import { Tree } from '@feyroads/world/core';
import { DrawPolygon } from '@feyroads/math/components';
import { useViewportContext } from '@feyroads/editor/viewport/state';

export type DrawTreeProps = {
  tree: Tree;
};

export const DrawTree = memo(function DrawTree({ tree }: DrawTreeProps) {
  const { center: viewportCenter } = useViewportContext();

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
