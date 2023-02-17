import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { AppError } from "../../AppError";
import { useSnackbarContext } from "../../core/Snackbar";
import { useToggle } from "../general/useToggle";
import { axiosErrorToAppError } from "../http/axiosErrorToAppError";

export function useHTTPPutRequest<Body, Result>(url: string) {
  const [isLoading, startLoading, stopLoading] = useToggle(false);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [error, setError] = useState<AppError | undefined>(undefined);

  const { openSnackbar } = useSnackbarContext();

  const doRequest = async (body: Body) => {
    startLoading();
    setResult(undefined);
    setError(undefined);

    try {
      setResult(
        (await axios.put<Result, AxiosResponse<Result>, Body>(url, body)).data
      );
    } catch (e) {
      const appError = axiosErrorToAppError(e as AxiosError);

      setError(appError);
      openSnackbar("error", appError.message);
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
