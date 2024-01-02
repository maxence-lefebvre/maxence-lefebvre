import { memo, ReactNode } from 'react';
import { GraphStateContextProvider } from '@feyroads/math/components';
import { ViewportContextProvider } from '@feyroads/editor/viewport/components';
import { GraphEditorContextProvider } from '@feyroads/editor/graph/components';
import { WorldContextProvider } from '@feyroads/world/components';

export type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = memo(function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <GraphStateContextProvider>
      <ViewportContextProvider>
        <GraphEditorContextProvider>
          <WorldContextProvider>{children}</WorldContextProvider>
        </GraphEditorContextProvider>
      </ViewportContextProvider>
    </GraphStateContextProvider>
  );
});
