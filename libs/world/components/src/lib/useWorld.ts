import { GraphState } from '@feyroads/math/components';
import { useMemo } from 'react';
import { World } from '@feyroads/world/core';

export const useWorld = ({ graphState }: { graphState: GraphState }) => {
  const { graph } = graphState;

  return useMemo(() => new World(graph), [graph]);
};
