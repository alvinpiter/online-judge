import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { User } from "../../User/interface";

export function useGetUserSearchSuggestionsRequest(usernamePrefix: string) {
  const apiUrl = `${config.backendAPIURL}/user-search-suggestions?query=${usernamePrefix}`;
  return useHTTPGetRequest<User[]>(apiUrl);
}
