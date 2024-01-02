import { memo, ReactNode } from 'react';
import { GraphEditorContext } from './GraphEditorContext';
import { useGraphEditor } from './useGraphEditor';
import { useGraphStateContext } from '@feyroads/math/components';
import { useViewportContext } from '@feyroads/editor/viewport/components';

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
