import { useViewportContext } from '@feyroads/editor/viewport/state';
import { DrawPolygon } from '@feyroads/math/components';
import { Tree } from '@feyroads/world/core';
import { map } from 'lodash';
import { Fragment, memo, useMemo } from 'react';

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
      {map(levels, ({ color, polygon }) => {
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
