import { createContext } from 'react';

import { GraphEditor } from './types';

export const GraphEditorContext = createContext<GraphEditor | null>(null);
