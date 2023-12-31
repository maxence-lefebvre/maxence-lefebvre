import { useCallback, useState } from 'react';
import { GraphState } from './types';

export const useCanvasState = ({ graphState }: { graphState: GraphState }) => {
  const { selectedPoint } = graphState;

  const [isHoveringPoint, setIsHoveringPoint] = useState(false);

  const onMouseEnterPoint = useCallback(
    () => setIsHoveringPoint(!selectedPoint),
    [selectedPoint],
  );
  const onMouseLeavePoint = useCallback(() => setIsHoveringPoint(false), []);

  return {
    isHoveringPoint,
    onMouseEnterPoint,
    onMouseLeavePoint,
  };
};
