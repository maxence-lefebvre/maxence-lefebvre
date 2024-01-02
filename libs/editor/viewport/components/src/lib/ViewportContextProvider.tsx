import { memo, ReactNode } from 'react';
import { useViewport } from './useViewport';
import { useGraphStateContext } from '@feyroads/math/components';
import { ViewportContext } from './ViewportContext';

export type ViewportContextProps = { children: ReactNode };

export const ViewportContextProvider = memo(function ViewportContextProvider({
  children,
}: ViewportContextProps) {
  const graphState = useGraphStateContext();
  const viewport = useViewport({
    graphState,
  });

  return (
    <ViewportContext.Provider value={viewport}>
      {children}
    </ViewportContext.Provider>
  );
});
