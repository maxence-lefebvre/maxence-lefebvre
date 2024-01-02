import { useNonNullableContext } from '@feyroads/ext/react/hooks';

import { AppCanvasContext } from './AppCanvasContext';

export const useAppCanvasContext = () =>
  useNonNullableContext(AppCanvasContext);
