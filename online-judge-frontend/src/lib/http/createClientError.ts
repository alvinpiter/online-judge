import { AxiosError } from "axios";
import { ClientError } from "../ClientError";
import { FailedHTTPResponse } from "./interfaces";

export function createClientError(axiosError: AxiosError) {
  const { code, message } = axiosError.response
    ? (axiosError.response.data as FailedHTTPResponse).error
    : { code: "UNKNOWN_ERROR", message: "UNKNOWN_ERROR" };

  return new ClientError(code, message);
}
