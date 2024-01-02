import styled from '@emotion/styled';
import { Layer } from 'react-konva';
import { DrawDebug, DrawWorld } from '@feyroads/world/components';
import { GraphControls } from './graph/GraphControls';
import { Canvas } from './graph/Canvas';
import { useCanvasState } from './graph/useCanvasState';
import { useBoolState } from '@feyroads/ext/react/hooks';
import { css } from '@emotion/react';
import { DrawGraphEditor } from '@feyroads/editor/graph/components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  flex: 1 0 auto;
  width: 100vw;
  max-height: 100vh;

  align-items: center;
`;

export const App = () => {
  const { isHoveringPoint, onMouseEnterPoint, onMouseLeavePoint } =
    useCanvasState();
  const debugMode = useBoolState(
    window.location.hostname === 'localhost',
    'debugMode',
  );

  return (
    <AppContainer>
      <Canvas isHoveringPoint={isHoveringPoint}>
        <Layer>
          <DrawWorld />
        </Layer>
        <DrawDebug enabled={debugMode.isDebugMode} />
        <DrawGraphEditor
          onMouseEnterPoint={onMouseEnterPoint}
          onMouseLeavePoint={onMouseLeavePoint}
        />
      </Canvas>
      <GraphControls
        css={css`
          position: absolute;
          top: 20px;
          right: 20px;

          flex-direction: column;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 10px;
        `}
        debugMode={debugMode}
      />
    </AppContainer>
  );
};
