import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { User } from "../interface";

export function useCurrentUserRequest() {
  const apiUrl = `${config.backendAPIURL}/current-user`;
  return useHTTPGetRequest<User>(apiUrl);
}
