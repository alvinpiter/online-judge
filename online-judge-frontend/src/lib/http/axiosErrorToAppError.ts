import { AxiosError } from "axios";
import { AppError } from "../../AppError";

export interface FailedHTTPResponse {
  error: {
    code: string;
    message: string;
  };
}

export function axiosErrorToAppError(axiosError: AxiosError) {
  const { code, message } = axiosError.response
    ? (axiosError.response.data as FailedHTTPResponse).error
    : { code: "UNKNOWN_ERROR", message: "UNKNOWN_ERROR" };

  return new AppError(code, message);
}
