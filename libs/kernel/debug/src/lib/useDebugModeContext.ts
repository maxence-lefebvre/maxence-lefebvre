import { useNonNullableContext } from '@feyroads/ext/react/hooks';

import { DebugModeContext } from './DebugModeContext';

export const useDebugModeContext = () =>
  useNonNullableContext(DebugModeContext);
