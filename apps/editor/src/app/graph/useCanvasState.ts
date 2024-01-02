import { useCallback } from 'react';
import { useBoolState } from '@feyroads/ext/react/hooks';
import { useGraphStateContext } from '@feyroads/math/components';

export const useCanvasState = () => {
  const { selectedPoint } = useGraphStateContext();

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
