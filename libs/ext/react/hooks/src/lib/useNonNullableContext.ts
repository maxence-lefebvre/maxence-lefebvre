import invariant from 'invariant';
import { Context, useContext } from 'react';

export const useNonNullableContext = <TValue>(
  context: Context<TValue>,
): NonNullable<TValue> => {
  const value = useContext(context);

  invariant(
    !!value,
    `use${context.displayName} must be used inside a ${context.displayName}.Provider`,
  );

  return value;
};
