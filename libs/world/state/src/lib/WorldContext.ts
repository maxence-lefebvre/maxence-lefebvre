import { createContext } from 'react';
import { World } from '@feyroads/world/core';

export const WorldContext = createContext<World | null>(null);
WorldContext.displayName = 'WorldContext';
