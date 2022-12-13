import { ClientError } from "../ClientError";
import { createHTTPPostRequestFunction } from "../http/createHTTPPostRequestFunction";
import { useHTTPRequestVariables } from "./useHTTPRequestVariables";

export function useHTTPPostRequest<Body, Result>(url: string) {
  const {
    isLoading,
    startLoading,
    stopLoading,
    result,
    setResult,
    error,
    setError,
  } = useHTTPRequestVariables<Result>();

  const doRequest = async (body: Body) => {
    startLoading();
    setResult(undefined);
    setError(undefined);

    try {
      const requestFunction = createHTTPPostRequestFunction<Body, Result>(url);
      setResult(await requestFunction(body));
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
