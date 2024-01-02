import styled from '@emotion/styled';
import { Layer } from 'react-konva';
import { useGraphEditor } from './graph/useGraphEditor';
import { DrawDebug, DrawWorld } from '@feyroads/world/components';
import { DrawGraphEditor } from './graph/DrawGraphEditor';
import { GraphControls } from './graph/GraphControls';
import { Canvas } from './graph/Canvas';
import { useCanvasState } from './graph/useCanvasState';
import { useWorld } from './graph/useWorld';
import { useBoolState } from '@feyroads/ext/react/hooks';
import {
  useViewport,
  ViewportContext,
} from '@feyroads/editor/viewport/components';
import { GraphStateContext, useGraphState } from '@feyroads/math/components';
import { GraphEditorContext } from './graph/GraphEditorContext';
import { css } from '@emotion/react';

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
  const graphState = useGraphState();
  const viewport = useViewport({ graphState });
  const graphEditor = useGraphEditor({ graphState, viewport });
  const world = useWorld({ graphState });
  const { isHoveringPoint, onMouseEnterPoint, onMouseLeavePoint } =
    useCanvasState({ graphState });
  const debugMode = useBoolState(
    window.location.hostname === 'localhost',
    'debugMode',
  );

  return (
    <GraphStateContext.Provider value={graphState}>
      <ViewportContext.Provider value={viewport}>
        <GraphEditorContext.Provider value={graphEditor}>
          <AppContainer>
            <Canvas isHoveringPoint={isHoveringPoint}>
              <Layer>
                <DrawWorld world={world} />
              </Layer>
              <DrawDebug enabled={debugMode.isDebugMode} world={world} />
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
        </GraphEditorContext.Provider>
      </ViewportContext.Provider>
    </GraphStateContext.Provider>
  );
};
