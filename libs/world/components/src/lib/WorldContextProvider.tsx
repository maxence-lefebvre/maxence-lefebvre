import { memo, ReactNode } from 'react';
import { WorldContext } from './WorldContext';
import { useWorld } from './useWorld';
import { useGraphStateContext } from '@feyroads/math/components';

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
