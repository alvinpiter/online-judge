import React, { useContext } from "react";

interface UseContextHook<T> {
  (): T;
  (isOptional: boolean): T | undefined;
}

export function createContextAndUseContextHook<T>(
  identifier: string
): [React.Context<T | undefined>, UseContextHook<T>] {
  const Context = React.createContext<T | undefined>(undefined);
  Context.displayName = identifier;

  const Hook = (isOptional = false) => {
    const value = useContext(Context);
    if (!isOptional && value === undefined) {
      throw new Error(`Can not find context ${identifier}`);
    }
    return value;
  };

  return [Context, Hook as UseContextHook<T>];
}
