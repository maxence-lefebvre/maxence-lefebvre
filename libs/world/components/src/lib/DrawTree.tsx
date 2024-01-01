import { Fragment, memo, useMemo } from 'react';
import { Tree } from '@feyroads/world/core';
import { DrawPoint, DrawSegment } from '@feyroads/math/components';
import { Viewport } from '@feyroads/editor/viewport/components';
import { Segment } from '@feyroads/math/graph';

export type DrawTreeProps = {
  tree: Tree;
  viewport: Viewport;
};

export const DrawTree = memo(function DrawTree({
  tree,
  viewport: { center: viewportCenter },
}: DrawTreeProps) {
  const {
    center: treeCenter,
    graphicOptions: { heightCoefficient, size: treeSize },
  } = tree;

  const topSegment = useMemo(() => {
    return new Segment(
      treeCenter,
      treeCenter.add(
        treeCenter.substract(viewportCenter).scale(heightCoefficient),
      ),
    );
  }, [treeCenter, viewportCenter, heightCoefficient]);

  return (
    <Fragment>
      <DrawPoint
        point={treeCenter}
        fill="rgba(0,255, 0, .8)"
        stroke="rgba(0,255, 0, .8)"
        width={treeSize}
      />
      <DrawSegment segment={topSegment} />
    </Fragment>
  );
});
