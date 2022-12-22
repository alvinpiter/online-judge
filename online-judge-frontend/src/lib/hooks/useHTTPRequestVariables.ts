import { useState } from "react";
import { ClientError } from "../ClientError";
import { useToggle } from "./useToggle";

export function useHTTPRequestVariables<Result>(
  shouldRequestImmediately = false
) {
  const [isLoading, startLoading, stopLoading] = useToggle(
    shouldRequestImmediately
  );
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [error, setError] = useState<ClientError | undefined>(undefined);

  return {
    isLoading,
    startLoading,
    stopLoading,
    result,
    setResult,
    error,
    setError,
  };
}
