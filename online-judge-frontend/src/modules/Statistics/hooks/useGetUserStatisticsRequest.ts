import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { UserStatistics } from "./interfaces";

export function useGetUserStatisticsRequest(userId: number) {
  const apiUrl = `${config.backendAPIURL}/users/${userId}/statistics`;
  return useHTTPGetRequest<UserStatistics>(apiUrl);
}
