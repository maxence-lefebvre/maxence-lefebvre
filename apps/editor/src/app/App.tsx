import styled from '@emotion/styled';
import { Layer } from 'react-konva';
import { useGraphEditor } from './graph/useGraphEditor';
import { useViewport } from './graph/useViewport';
import { useGraphState } from './graph/useGraphState';
import { DrawWorld } from '@feyroads/world/components';
import { DrawGraphEditor } from './graph/DrawGraphEditor';
import { GraphControls } from './graph/GraphControls';
import { Canvas } from './graph/Canvas';
import { useCanvasState } from './graph/useCanvasState';
import { useWorld } from './graph/useWorld';

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

  return (
    <AppContainer>
      <Canvas
        graphEditor={graphEditor}
        viewport={viewport}
        isHoveringPoint={isHoveringPoint}
      >
        <Layer>
          <DrawWorld world={world} />
        </Layer>
        <DrawGraphEditor
          graphState={graphState}
          graphEditor={graphEditor}
          onMouseEnterPoint={onMouseEnterPoint}
          onMouseLeavePoint={onMouseLeavePoint}
        />
      </Canvas>
      <GraphControls graphState={graphState} />
    </AppContainer>
  );
};
