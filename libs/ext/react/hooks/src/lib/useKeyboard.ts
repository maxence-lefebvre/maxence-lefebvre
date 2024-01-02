import invariant from 'invariant';
import { includes, partition, split, toLower } from 'lodash';
import { useEffect, useRef } from 'react';

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
    const [modifiers, keys] = partition(split(toLower(key), '+'), (k) =>
      includes(MODIFIERS, k),
    );

    invariant(
      keys.length === 1,
      'There could be any modifier key but only one regular key',
    );

    const handleEvent = (event: KeyboardEvent) => {
      if (includes(modifiers, 'ctrl') && !event.ctrlKey) {
        return;
      }
      if (includes(modifiers, 'alt') && !event.altKey) {
        return;
      }
      if (includes(modifiers, 'shift') && !event.shiftKey) {
        return;
      }
      if (includes(modifiers, 'meta') && !event.metaKey) {
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
