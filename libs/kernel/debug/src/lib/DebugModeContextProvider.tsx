import { memo, ReactNode } from 'react';

import { DebugModeContext } from './DebugModeContext';
import { useDebugMode } from './useDebugMode';

export type DebugModeContextProviderProps = {
  children: ReactNode;
};

export const DebugModeContextProvider = memo(function DebugModeContextProvider({
  children,
}: DebugModeContextProviderProps) {
  const debugMode = useDebugMode();

  return (
    <DebugModeContext.Provider value={debugMode}>
      {children}
    </DebugModeContext.Provider>
  );
});
