import { AxiosError } from "axios";
import { ClientError } from "../ClientError";
import { FailedHTTPResponse } from "./interfaces";

export function httpRequestErrorHandler(error: AxiosError) {
  const err = error.response
    ? (error.response.data as FailedHTTPResponse).error
    : {
        code: "UNKOWN_ERROR",
        message: "UNKNOWN_ERROR",
      };

  throw new ClientError(err.code, err.message);
}
