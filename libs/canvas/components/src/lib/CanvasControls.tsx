import { css } from '@emotion/react';
import { useViewportContext } from '@feyroads/editor/viewport/state';
import { useKeyboard } from '@feyroads/ext/react/hooks';
import { useDebugModeContext } from '@feyroads/kernel/debug';
import { useGraphStateContext } from '@feyroads/math/state';
import { IconDeviceFloppy, IconTool, IconTrash } from '@tabler/icons-react';
import { ComponentPropsWithoutRef, memo, useCallback } from 'react';


export type CanvasControlsProps = ComponentPropsWithoutRef<'div'>;

export const CanvasControls = memo(function CanvasControls({
  ...props
}: CanvasControlsProps) {
  const { saveGraph, disposeGraph } = useGraphStateContext();
  const { saveViewportState } = useViewportContext();
  const { toggleDebugMode } = useDebugModeContext();

  const onClickSave = useCallback(() => {
    saveGraph();
    saveViewportState();
  }, [saveGraph, saveViewportState]);

  useKeyboard('ctrl+d', toggleDebugMode);

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
      <button onClick={toggleDebugMode} title="Toggle debug mode">
        <IconTool />
      </button>
    </div>
  );
});
