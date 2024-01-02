import { useNonNullableContext } from '@feyroads/ext/react/hooks';

import { WorldContext } from './WorldContext';

export const useWorldContext = () => useNonNullableContext(WorldContext);
