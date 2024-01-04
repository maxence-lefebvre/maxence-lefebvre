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
          left: 50%;
          transform: translateX(-50%);

          padding: 0.25rem;
          background-color: #fff;
          border-radius: 0.5rem;
          box-shadow:
            0 0 1px 0 rgba(0, 0, 0, 0.17),
            0 0 3px 0 rgba(0, 0, 0, 0.08),
            0 7px 14px 0 rgba(0, 0, 0, 0.05);

          transition: box-shadow 0.5s ease-in-out;
        `}
      />
    </AppContainer>
  );
});
