import { GraphStateContext } from './GraphStateContext';
import { useNonNullableContext } from '@feyroads/ext/react/hooks';

export const useGraphStateContext = () =>
  useNonNullableContext(GraphStateContext);
