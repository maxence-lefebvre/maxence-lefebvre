import { GraphState } from '@feyroads/math/state';
import { useMemo } from 'react';
import { World } from '@feyroads/world/core';

export const useWorld = ({ graphState }: { graphState: GraphState }) => {
  const { graph } = graphState;

  return useMemo(() => new World(graph), [graph]);
};
