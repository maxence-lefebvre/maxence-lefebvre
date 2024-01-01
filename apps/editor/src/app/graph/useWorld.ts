import { useMemo } from 'react';
import { World } from '@feyroads/world/core';
import { GraphState } from '@feyroads/math/components';

export const useWorld = ({ graphState }: { graphState: GraphState }) => {
  const { graph } = graphState;

  return useMemo(() => new World(graph), [graph]);
};
