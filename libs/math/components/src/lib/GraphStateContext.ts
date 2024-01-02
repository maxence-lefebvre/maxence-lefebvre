import { createContext } from 'react';
import { GraphState } from './types';

export const GraphStateContext = createContext<GraphState | null>(null);
GraphStateContext.displayName = 'GraphStateContext';
