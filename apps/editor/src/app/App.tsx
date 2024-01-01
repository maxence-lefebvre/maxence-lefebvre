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
import { useViewport } from '@feyroads/editor/viewport/components';
import { useGraphState } from '@feyroads/math/components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

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
    <AppContainer>
      <Canvas
        graphEditor={graphEditor}
        viewport={viewport}
        isHoveringPoint={isHoveringPoint}
      >
        <Layer>
          <DrawWorld world={world} viewport={viewport} />
        </Layer>
        <DrawDebug enabled={debugMode.isDebugMode} world={world} />
        <DrawGraphEditor
          graphState={graphState}
          graphEditor={graphEditor}
          onMouseEnterPoint={onMouseEnterPoint}
          onMouseLeavePoint={onMouseLeavePoint}
        />
      </Canvas>
      <GraphControls
        graphState={graphState}
        viewport={viewport}
        debugMode={debugMode}
      />
    </AppContainer>
  );
};
