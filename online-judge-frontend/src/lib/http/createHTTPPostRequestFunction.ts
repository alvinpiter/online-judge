import axios, { AxiosError } from "axios";
import { createClientError } from "./createClientError";

export function createHTTPPostRequestFunction<Body, Result>(url: string) {
  return async (body: Body): Promise<Result> => {
    try {
      const response = await axios.post(url, body);
      return response.data as Result;
    } catch (e) {
      throw createClientError(e as AxiosError);
    }
  };
}
