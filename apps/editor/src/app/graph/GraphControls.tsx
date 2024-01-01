import { memo, useCallback } from 'react';
import { DebugMode, GraphState, Viewport } from './types';
import { css } from '@emotion/react';
import { IconDeviceFloppy, IconTool, IconTrash } from '@tabler/icons-react';

export type GraphControlsProps = {
  graphState: GraphState;
  viewport: Viewport;
  debugMode: DebugMode;
};

export const GraphControls = memo(function GraphControls({
  graphState,
  viewport,
  debugMode,
}: GraphControlsProps) {
  const { saveGraph, disposeGraph } = graphState;
  const { saveViewportState } = viewport;

  const onClickSave = useCallback(() => {
    saveGraph();
    saveViewportState();
  }, [saveGraph, saveViewportState]);

  return (
    <div
      css={css`
        display: flex;
        gap: 20px;
      `}
    >
      <button onClick={onClickSave} title="Save graph to local storage">
        <IconDeviceFloppy />
      </button>
      <button onClick={disposeGraph} title="Reset graph to default">
        <IconTrash />
      </button>
      <button onClick={debugMode.toggleDebugMode} title="Toggle debug mode">
        <IconTool />
      </button>
    </div>
  );
});
