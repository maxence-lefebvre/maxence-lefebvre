import { createContext } from 'react';

import { DebugMode } from './types';

export const DebugModeContext = createContext<DebugMode | null>(null);
