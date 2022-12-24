import { config } from "../../../config";
import { useHTTPPostRequest } from "../../../lib/http/useHTTPPostRequest";

export function useSignOutRequest() {
  const apiUrl = `${config.backendAPIURL}/sign-out`;
  return useHTTPPostRequest<{}, string>(apiUrl);
}
