import { config } from "../../../config";
import { useHTTPPostRequest } from "../../../lib/hooks/useHTTPPostRequest";

interface SignInRequestBody {
  username: string;
  password: string;
}

interface SignInRequestResponse {
  jwt: string;
}

export function useSignInRequest() {
  const apiUrl = `${config.backendAPIURL}/sign-in`;
  return useHTTPPostRequest<SignInRequestBody, SignInRequestResponse>(apiUrl);
}