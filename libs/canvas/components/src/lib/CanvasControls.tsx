import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useViewportContext } from '@feyroads/editor/viewport/state';
import { useKeyboard } from '@feyroads/ext/react/hooks';
import { useDebugModeContext } from '@feyroads/kernel/debug';
import { useGraphStateContext } from '@feyroads/math/state';
import { IconDeviceFloppy, IconTool, IconTrash } from '@tabler/icons-react';
import { ComponentPropsWithoutRef, memo, useCallback } from 'react';

export type CanvasControlsProps = ComponentPropsWithoutRef<'div'>;

export const ControlButton = styled.button`
  position: relative;

  all: unset;

  --border-radius: 0.25rem;
  --size: 2.5rem;

  --hover-bg-color: #e5e4ff;
  --icon-color: #1b1b1f;
  --hover-color: #4946bd;

  border-radius: var(--border-radius);
  display: inline-flex;
  cursor: pointer;

  &:hover {
    background-color: var(--hover-bg-color);

    * {
      color: var(--hover-color);
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: var(--border-radius);
  width: var(--size);
  height: var(--size);
`;

export const Divider = styled.div`
  width: 1px;
  height: 1.5rem;

  align-self: center;

  background-color: #8484b9;

  margin: 0 0.25rem;
`;

export const icon = css`
  width: calc(var(--size) / 2);
  height: calc(var(--size) / 2);
  color: var(--icon-color);
`;

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
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: min-content;
        grid-template-rows: auto;

        gap: 0.25rem;
      `}
    >
      <ControlButton
        onClick={onClickSave}
        title="Save graph to local storage -- ctrl + s"
      >
        <IconContainer>
          <IconDeviceFloppy css={icon} />
        </IconContainer>
      </ControlButton>
      <ControlButton onClick={disposeGraph} title="Reset graph to default">
        <IconContainer>
          <IconTrash css={icon} />
        </IconContainer>
      </ControlButton>
      <Divider />
      <ControlButton
        onClick={toggleDebugMode}
        title="Toggle debug mode -- ctrl + d"
      >
        <IconContainer>
          <IconTool css={icon} />
        </IconContainer>
      </ControlButton>
    </div>
  );
});
