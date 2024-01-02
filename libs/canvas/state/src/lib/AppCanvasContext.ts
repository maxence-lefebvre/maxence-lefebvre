import { createContext } from 'react';

import { AppCanvas } from './types';

export const AppCanvasContext = createContext<AppCanvas | null>(null);
