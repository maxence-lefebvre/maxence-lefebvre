import { GraphState } from '@feyroads/math/state';
import { World } from '@feyroads/world/core';
import { useMemo } from 'react';

export const useWorld = ({ graphState }: { graphState: GraphState }) => {
  const { graph } = graphState;

  return useMemo(() => new World(graph), [graph]);
};
