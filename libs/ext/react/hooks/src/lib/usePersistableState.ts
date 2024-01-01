import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from 'react';
import { useKeyboard } from './useKeyboard';

export const usePersistableState = <T>(
  key: string,
  initialValue: T,
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: { serialize?: (v: T) => string; deserialize?: (s: string) => T } = {},
): [T, Dispatch<SetStateAction<T>>, VoidFunction] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const data = localStorage.getItem(key);
      return data ? deserialize(data) : initialValue;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  const persist = useCallback(() => {
    localStorage.setItem(key, serialize(value));
  }, [value, key, serialize]);

  useKeyboard('ctrl+s', persist);

  return [value, setValue, persist];
};
