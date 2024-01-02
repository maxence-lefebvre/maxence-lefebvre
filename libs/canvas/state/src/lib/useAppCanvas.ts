import { useBoolState } from '@feyroads/ext/react/hooks';
import { useGraphStateContext } from '@feyroads/math/state';
import { useCallback } from 'react';

import { AppCanvas } from './types';

export const useAppCanvas = (): AppCanvas => {
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
