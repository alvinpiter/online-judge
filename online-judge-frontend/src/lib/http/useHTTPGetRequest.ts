import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { AppError } from "../../AppError";
import { axiosErrorToAppError } from "./axiosErrorToAppError";
import { useToggle } from "../general/useToggle";
import { useSnackbarContext } from "../../core/Snackbar";

export function useHTTPGetRequest<Result>(url: string) {
  const [isLoading, startLoading, stopLoading] = useToggle(true);
  const [result, setResult] = useState<Result | undefined>(undefined);
  const [error, setError] = useState<AppError | undefined>(undefined);
  const { openSnackbar } = useSnackbarContext();

  const doRequest = useCallback(async () => {
    startLoading();
    setResult(undefined);
    setError(undefined);

    try {
      setResult((await axios.get<Result>(url)).data);
    } catch (e) {
      const appError = axiosErrorToAppError(e as AxiosError);

      setError(appError);
      openSnackbar("error", appError.message);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, setResult, setError, openSnackbar, url]);

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
