import { memo, ReactNode } from 'react';

import { AppCanvasContextProvider } from '@feyroads/canvas/state';
import { GraphEditorContextProvider } from '@feyroads/editor/graph/state';
import { ViewportContextProvider } from '@feyroads/editor/viewport/state';
import { DebugModeContextProvider } from '@feyroads/kernel/debug';
import { GraphStateContextProvider } from '@feyroads/math/state';
import { WorldContextProvider } from '@feyroads/world/state';

export type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = memo(function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <GraphStateContextProvider>
      <AppCanvasContextProvider>
        <ViewportContextProvider>
          <WorldContextProvider>
            <GraphEditorContextProvider>
              <DebugModeContextProvider>{children}</DebugModeContextProvider>
            </GraphEditorContextProvider>
          </WorldContextProvider>
        </ViewportContextProvider>
      </AppCanvasContextProvider>
    </GraphStateContextProvider>
  );
});
