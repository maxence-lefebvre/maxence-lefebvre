import { useNonNullableContext } from '@feyroads/ext/react/hooks';
import { GraphEditorContext } from './GraphEditorContext';

export const useGraphEditorContext = () =>
  useNonNullableContext(GraphEditorContext);
