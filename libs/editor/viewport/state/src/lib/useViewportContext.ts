import { useNonNullableContext } from '@feyroads/ext/react/hooks';

import { ViewportContext } from './ViewportContext';

export const useViewportContext = () => useNonNullableContext(ViewportContext);
