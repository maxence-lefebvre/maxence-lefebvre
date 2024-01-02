import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { memo } from 'react';
import { Layer } from 'react-konva';

import { Canvas, CanvasControls } from '@feyroads/canvas/components';
import { DrawGraphEditor } from '@feyroads/editor/graph/components';
import { DrawDebug, DrawWorld } from '@feyroads/world/components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  flex: 1 0 auto;
  width: 100vw;
  max-height: 100vh;

  align-items: center;
`;

export const App = memo(function App() {
  return (
    <AppContainer>
      <Canvas>
        <Layer>
          <DrawWorld />
        </Layer>
        <DrawDebug />
        <DrawGraphEditor />
      </Canvas>
      <CanvasControls
        css={css`
          position: absolute;
          top: 20px;
          right: 20px;

          flex-direction: column;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 10px;
        `}
      />
    </AppContainer>
  );
});
