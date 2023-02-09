import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { User } from "../interface";

export function useGetUserRequest(userId: number) {
  const apiUrl = `${config.backendAPIURL}/users/${userId}`;
  return useHTTPGetRequest<User>(apiUrl);
}
