import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { UserRole } from "../interface";

interface CurrentUserResponse {
  username: string;
  role: UserRole;
}

export function useCurrentUserRequest() {
  const apiUrl = `${config.backendAPIURL}/current-user`;
  return useHTTPGetRequest<CurrentUserResponse>(apiUrl);
}
