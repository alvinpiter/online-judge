import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { AppError } from "../../AppError";
import { axiosErrorToAppError } from "./axiosErrorToAppError";
import { useToggle } from "../general/useToggle";

export function useHTTPGetRequest<Result>(url: string) {
  const [isLoading, startLoading, stopLoading] = useToggle(true);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [error, setError] = useState<AppError | undefined>(undefined);

  const doRequest = useCallback(async () => {
    startLoading();
    setResult(undefined);
    setError(undefined);

    try {
      setResult((await axios.get<Result>(url)).data);
    } catch (e) {
      setError(axiosErrorToAppError(e as AxiosError));
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
