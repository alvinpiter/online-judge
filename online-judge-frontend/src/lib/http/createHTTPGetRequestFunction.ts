import axios, { AxiosError } from "axios";
import { ClientError } from "../ClientError";
import { FailedHTTPResponse } from "./interfaces";

export function createHTTPGetRequestFunction<Result>(url: string) {
  return async (): Promise<Result> => {
    try {
      // Axios throws error if the HTTP code of the response is not 200
      const response = await axios.get(url);
      return response.data as Result;
    } catch (e) {
      const axiosError = e as AxiosError;

      const error = axiosError.response
        ? (axiosError.response.data as FailedHTTPResponse).error
        : {
            code: "UNKOWN_ERROR",
            message: "UNKNOWN_ERROR",
          };

      throw new ClientError(error.code, error.message);
    }
  };
}
