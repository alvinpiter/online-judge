import { useLocation } from "react-router-dom";

export function useCurrentQueryString() {
  const currentLocation = useLocation();
  return currentLocation.search.slice(1); // Exclude the '?'
}
