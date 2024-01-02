import { useGraphStateContext } from '@feyroads/math/state';
import { memo, ReactNode } from 'react';

import { useWorld } from './useWorld';
import { WorldContext } from './WorldContext';

export type WorldContextProviderProps = {
  children: ReactNode;
};

export const WorldContextProvider = memo(function WorldContextProvider({
  children,
}: WorldContextProviderProps) {
  const graphState = useGraphStateContext();
  const world = useWorld({ graphState });

  return (
    <WorldContext.Provider value={world}>{children}</WorldContext.Provider>
  );
});
