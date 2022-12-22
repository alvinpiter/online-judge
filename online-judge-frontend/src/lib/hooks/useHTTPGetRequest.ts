import { useCallback, useEffect } from "react";
import { ClientError } from "../ClientError";
import { createHTTPGetRequestFunction } from "../http/createHTTPGetRequestFunction";
import { useHTTPRequestVariables } from "./useHTTPRequestVariables";

export function useHTTPGetRequest<Result>(url: string) {
  const {
    isLoading,
    startLoading,
    stopLoading,
    result,
    setResult,
    error,
    setError,
  } = useHTTPRequestVariables<Result>(true);

  const doRequest = useCallback(async () => {
    startLoading();
    setResult(undefined);
    setError(undefined);

    try {
      const requestFunction = createHTTPGetRequestFunction<Result>(url);
      setResult(await requestFunction());
    } catch (e) {
      setError(e as ClientError);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, setResult, setError, url]);

  useEffect(() => {
    doRequest();
  }, [doRequest]);

  return {
    isLoading,
    result,
    error,
    requestFunction: doRequest,
  };
}
