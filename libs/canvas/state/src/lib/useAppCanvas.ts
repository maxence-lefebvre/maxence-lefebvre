import { useBoolState } from '@feyroads/ext/react/hooks';

import { AppCanvas } from './types';

export const useAppCanvas = (): AppCanvas => {
  const { isHoveringPoint, setHoveringPointTrue, setHoveringPointFalse } =
    useBoolState(false, 'hoveringPoint');

  return {
    isHoveringPoint,
    onMouseEnterPoint: setHoveringPointTrue,
    onMouseLeavePoint: setHoveringPointFalse,
  };
};
