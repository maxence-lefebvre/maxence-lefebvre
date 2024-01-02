import { useViewportContext } from '@feyroads/editor/viewport/state';
import { useGraphStateContext } from '@feyroads/math/state';
import { memo, ReactNode } from 'react';

import { GraphEditorContext } from './GraphEditorContext';
import { useGraphEditor } from './useGraphEditor';

export type GraphEditorContextProps = { children: ReactNode };
export const GraphEditorContextProvider = memo(
  function GraphEditorContextProvider({ children }: GraphEditorContextProps) {
    const graphState = useGraphStateContext();
    const viewport = useViewportContext();
    const graphEditor = useGraphEditor({
      graphState,
      viewport,
    });

    return (
      <GraphEditorContext.Provider value={graphEditor}>
        {children}
      </GraphEditorContext.Provider>
    );
  },
);
