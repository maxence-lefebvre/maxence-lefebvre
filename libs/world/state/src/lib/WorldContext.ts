import { World } from '@feyroads/world/core';
import { createContext } from 'react';

export const WorldContext = createContext<World | null>(null);
WorldContext.displayName = 'WorldContext';
