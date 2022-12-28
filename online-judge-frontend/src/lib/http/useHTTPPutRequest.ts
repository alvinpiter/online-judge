import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { AppError } from "../../AppError";
import { useToggle } from "../general/useToggle";
import { axiosErrorToAppError } from "../http/axiosErrorToAppError";

export function useHTTPPutRequest<Body, Result>(url: string) {
  const [isLoading, startLoading, stopLoading] = useToggle(false);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [error, setError] = useState<AppError | undefined>(undefined);

  const doRequest = async (body: Body) => {
    startLoading();
    setResult(undefined);
    setError(undefined);

    try {
      setResult(
        (await axios.put<Result, AxiosResponse<Result>, Body>(url, body)).data
      );
    } catch (e) {
      setError(axiosErrorToAppError(e as AxiosError));
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
