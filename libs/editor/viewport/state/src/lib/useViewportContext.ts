import { ViewportContext } from './ViewportContext';
import { useNonNullableContext } from '@feyroads/ext/react/hooks';

export const useViewportContext = () => useNonNullableContext(ViewportContext);
