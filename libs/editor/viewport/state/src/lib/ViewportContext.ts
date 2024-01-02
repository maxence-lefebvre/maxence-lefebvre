import { createContext } from 'react';
import { Viewport } from './types';

export const ViewportContext = createContext<Viewport | null>(null);
ViewportContext.displayName = 'ViewportContext';
