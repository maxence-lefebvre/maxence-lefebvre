import { useEffect, useRef } from 'react';
import { partition } from 'lodash';
import invariant from 'invariant';

const MODIFIERS = ['ctrl', 'alt', 'shift', 'meta'];

export const useKeyboard = (
  key: string,
  callback: (event: KeyboardEvent) => void,
) => {
  const cb = useRef(callback);

  useEffect(() => {
    cb.current = callback;
  }, [callback]);

  useEffect(() => {
    const [modifiers, keys] = partition(key.toLowerCase().split('+'), (k) =>
      MODIFIERS.includes(k),
    );

    invariant(
      keys.length === 1,
      'There could be any modifier key but only one regular key',
    );

    const handleEvent = (event: KeyboardEvent) => {
      if (modifiers.includes('ctrl') && !event.ctrlKey) {
        return;
      }
      if (modifiers.includes('alt') && !event.altKey) {
        return;
      }
      if (modifiers.includes('shift') && !event.shiftKey) {
        return;
      }
      if (modifiers.includes('meta') && !event.metaKey) {
        return;
      }
      if (event.key !== keys[0]) {
        return;
      }
      event.preventDefault();
      cb.current(event);
    };

    document.addEventListener('keydown', handleEvent);
    return () => document.removeEventListener('keydown', handleEvent);
  }, [key]);
};
