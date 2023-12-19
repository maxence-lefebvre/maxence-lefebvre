import { Graph, Point, Segment } from '@feyroads/math/graph';
import { useMemo } from 'react';

export const useGraph = (points: Point[], segments: Segment[]) => {
  const graph = useMemo(() => new Graph(points, segments), [points, segments]);

  return { graph };
};
