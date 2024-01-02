import { ComponentPropsWithoutRef, memo, useCallback } from 'react';
import { DebugMode } from './types';
import { css } from '@emotion/react';
import { IconDeviceFloppy, IconTool, IconTrash } from '@tabler/icons-react';
import { useViewportContext } from '@feyroads/editor/viewport/components';
import { useGraphStateContext } from '@feyroads/math/components';

export type GraphControlsProps = ComponentPropsWithoutRef<'div'> & {
  debugMode: DebugMode;
};

export const GraphControls = memo(function GraphControls({
  debugMode,
  ...props
}: GraphControlsProps) {
  const { saveGraph, disposeGraph } = useGraphStateContext();
  const { saveViewportState } = useViewportContext();

  const onClickSave = useCallback(() => {
    saveGraph();
    saveViewportState();
  }, [saveGraph, saveViewportState]);

  return (
    <div
      {...props}
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
