import { useBoolState } from '@feyroads/ext/react/hooks';

export const useDebugMode = () =>
  useBoolState(window.location.hostname === 'localhost', 'debugMode');
