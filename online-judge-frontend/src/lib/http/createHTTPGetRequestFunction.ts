import axios, { AxiosError } from "axios";
import { createClientError } from "./createClientError";

export function createHTTPGetRequestFunction<Result>(url: string) {
  return async (): Promise<Result> => {
    try {
      const response = await axios.get(url);
      return response.data as Result;
    } catch (e) {
      throw createClientError(e as AxiosError);
    }
  };
}
