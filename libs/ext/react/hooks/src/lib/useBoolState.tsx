import { upperFirst } from 'lodash';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from 'react';
import { type IsStringLiteral } from 'type-fest';

export type UseBoolStateValue<TName extends string> =
  IsStringLiteral<TName> extends true
    ? { [key in `is${Capitalize<TName>}`]: boolean } & {
        [key in `set${Capitalize<TName>}`]: Dispatch<SetStateAction<boolean>>;
      } & { [key in `set${Capitalize<TName>}True`]: () => void } & {
        [key in `set${Capitalize<TName>}False`]: () => void;
      } & { [key in `toggle${Capitalize<TName>}`]: () => void }
    : never;

export const useBoolState = <TName extends string = 'state'>(
  initialState: boolean | (() => boolean) = false,
  name: TName = 'state' as TName,
): UseBoolStateValue<TName> => {
  const [isState, setIsState] = useState<boolean>(initialState);

  const onTrue = useCallback(() => {
    setIsState(true);
  }, []);

  const onFalse = useCallback(() => {
    setIsState(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsState((currentState) => !currentState);
  }, []);

  const nameUpper = upperFirst(name);

  return {
    [`is${nameUpper}`]: isState,
    [`set${nameUpper}`]: setIsState,
    [`set${nameUpper}True`]: onTrue,
    [`set${nameUpper}False`]: onFalse,
    [`toggle${nameUpper}`]: onToggle,
  } as UseBoolStateValue<TName>;
};
