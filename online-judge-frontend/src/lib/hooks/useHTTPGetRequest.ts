import { useEffect, useState } from "react";
import { ClientError } from "../ClientError";
import { createHTTPGetRequestFunction } from "../http/createHTTPGetRequestFunction";
import { useToggle } from "./useToggle";

export function useHTTPGetRequest<Result>(url: string) {
  const [isLoading, startLoading, stopLoading] = useToggle(false);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [error, setError] = useState<ClientError | undefined>(undefined);

  const doRequest = async () => {
    startLoading();

    try {
      const requestFunction = createHTTPGetRequestFunction<Result>(url);
      const res = await requestFunction();
      setResult(res);
      setError(undefined);
    } catch (e) {
      setResult(undefined);
      setError(e as ClientError);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    doRequest();
  }, []);

  return {
    isLoading,
    result,
    error,
    rerequest: doRequest,
  };
}
