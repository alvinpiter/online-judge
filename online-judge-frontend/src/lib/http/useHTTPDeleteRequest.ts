import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { AppError } from "../../AppError";
import { useToggle } from "../general/useToggle";
import { axiosErrorToAppError } from "../http/axiosErrorToAppError";

/*
TODO:
The implementation is a little bit different than useHTTPGetRequest and
useHTTPPostRequest. Please revisit this.
*/
export function useHTTPDeleteRequest<UrlParameters, Result>(
  urlConstructor: (urlParameters: UrlParameters) => string
) {
  const [isLoading, startLoading, stopLoading] = useToggle(false);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [error, setError] = useState<AppError | undefined>(undefined);

  const doRequest = async (urlParameters: UrlParameters) => {
    const url = urlConstructor(urlParameters);

    startLoading();
    setResult(undefined);
    setError(undefined);

    try {
      setResult((await axios.delete<Result, AxiosResponse<Result>>(url)).data);
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
    requestFuncion: doRequest,
  };
}
