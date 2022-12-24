import { config } from "../../../config";
import { useHTTPPostRequest } from "../../../lib/http/useHTTPPostRequest";

interface SignInRequestBody {
  username: string;
  password: string;
}

interface SignInRequestResponse {
  accessToken: string;
}

export function useSignInRequest() {
  const apiUrl = `${config.backendAPIURL}/sign-in`;
  return useHTTPPostRequest<SignInRequestBody, SignInRequestResponse>(apiUrl);
}
