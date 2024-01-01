import { useCallback } from 'react';
import { useBoolState } from '@feyroads/ext/react/hooks';
import { GraphState } from '@feyroads/math/components';

export const useCanvasState = ({ graphState }: { graphState: GraphState }) => {
  const { selectedPoint } = graphState;

  const { isHoveringPoint, setHoveringPoint, setHoveringPointFalse } =
    useBoolState(false, 'hoveringPoint');

  const onMouseEnterPoint = useCallback(
    () => setHoveringPoint(!selectedPoint),
    [setHoveringPoint, selectedPoint],
  );

  return {
    isHoveringPoint,
    onMouseEnterPoint,
    onMouseLeavePoint: setHoveringPointFalse,
  };
};
