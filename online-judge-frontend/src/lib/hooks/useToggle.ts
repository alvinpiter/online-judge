import { useState } from "react";

export function useToggle(
  initialValue = false
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const setOn = () => setValue(true);
  const setOff = () => setValue(false);
  const toggle = () => setValue(!value);

  return [value, setOn, setOff, toggle];
}
