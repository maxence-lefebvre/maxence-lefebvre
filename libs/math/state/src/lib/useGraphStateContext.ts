import { useNonNullableContext } from '@feyroads/ext/react/hooks';

import { GraphStateContext } from './GraphStateContext';

export const useGraphStateContext = () =>
  useNonNullableContext(GraphStateContext);
