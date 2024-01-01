import { memo } from 'react';
import { DebugMode, GraphState } from './types';
import { css } from '@emotion/react';
import { IconDeviceFloppy, IconTool, IconTrash } from '@tabler/icons-react';

export type GraphControlsProps = {
  graphState: GraphState;
  debugMode: DebugMode;
};

export const GraphControls = memo(function GraphControls({
  graphState,
  debugMode,
}: GraphControlsProps) {
  const { saveGraph, disposeGraph } = graphState;

  return (
    <div
      css={css`
        display: flex;
        gap: 20px;
      `}
    >
      <button onClick={saveGraph} title="Save graph to local storage">
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
