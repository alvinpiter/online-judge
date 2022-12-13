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
  } = useHTTPRequestVariables<Result>();

  const doRequest = async () => {
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
  };

  return {
    isLoading,
    result,
    error,
    requestFunction: doRequest,
  };
}
