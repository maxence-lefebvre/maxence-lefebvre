import { memo } from 'react';
import { GraphState } from './types';
import { css } from '@emotion/react';
import { IconDeviceFloppy, IconTrash } from '@tabler/icons-react';

export type GraphControlsProps = {
  graphState: GraphState;
};

export const GraphControls = memo(function GraphControls({
  graphState,
}: GraphControlsProps) {
  const { saveGraph, disposeGraph } = graphState;

  return (
    <div
      css={css`
        display: flex;
        gap: 20px;
      `}
    >
      <button onClick={saveGraph}>
        <IconDeviceFloppy />
      </button>
      <button onClick={disposeGraph}>
        <IconTrash />
      </button>
    </div>
  );
});
