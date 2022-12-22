import { config } from "../../../config";
import { useHTTPPostRequest } from "../../../lib/hooks/useHTTPPostRequest";

export function useSignOutRequest() {
  const apiUrl = `${config.backendAPIURL}/sign-out`;
  return useHTTPPostRequest<{}, string>(apiUrl);
}
