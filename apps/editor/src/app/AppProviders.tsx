import { memo, ReactNode } from 'react';
import { GraphStateContextProvider } from '@feyroads/math/state';
import { ViewportContextProvider } from '@feyroads/editor/viewport/state';
import { GraphEditorContextProvider } from '@feyroads/editor/graph/state';
import { WorldContextProvider } from '@feyroads/world/state';

export type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = memo(function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <GraphStateContextProvider>
      <ViewportContextProvider>
        <WorldContextProvider>
          <GraphEditorContextProvider>{children}</GraphEditorContextProvider>
        </WorldContextProvider>
      </ViewportContextProvider>
    </GraphStateContextProvider>
  );
});
