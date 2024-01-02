import { memo, ReactNode } from 'react';
import { GraphStateContext } from './GraphStateContext';
import { useGraphState } from './useGraphState';

export type GraphStateContextProviderProps = {
  children: ReactNode;
};

export const GraphStateContextProvider = memo(
  function GraphStateContextProvider({
    children,
  }: GraphStateContextProviderProps) {
    const graphState = useGraphState();

    return (
      <GraphStateContext.Provider value={graphState}>
        {children}
      </GraphStateContext.Provider>
    );
  },
);
