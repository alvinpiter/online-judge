import { useCallback, useState } from "react";

export function useToggle(
  initialValue = false
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const setOn = useCallback(() => setValue(true), []);
  const setOff = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(!value), [value]);

  return [value, setOn, setOff, toggle];
}
