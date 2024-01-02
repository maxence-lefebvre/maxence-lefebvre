import { ViewportContext } from './viewport.context';
import { useNonNullableContext } from '@feyroads/ext/react/hooks';

export const useViewportContext = () => useNonNullableContext(ViewportContext);
