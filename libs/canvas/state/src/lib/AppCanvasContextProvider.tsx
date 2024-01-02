import { memo, ReactNode } from 'react';

import { AppCanvasContext } from './AppCanvasContext';
import { useAppCanvas } from './useAppCanvas';

export type AppCanvasContextProviderProps = {
  children: ReactNode;
};

export const AppCanvasContextProvider = memo(function AppCanvasContextProvider({
  children,
}: AppCanvasContextProviderProps) {
  const canvasState = useAppCanvas();

  return (
    <AppCanvasContext.Provider value={canvasState}>
      {children}
    </AppCanvasContext.Provider>
  );
});
