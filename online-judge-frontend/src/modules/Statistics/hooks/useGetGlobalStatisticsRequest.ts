import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { GlobalStatistics } from "./interfaces";

export function useGetGlobalStatisticsRequest() {
  const apiUrl = `${config.backendAPIURL}/statistics/global`;
  return useHTTPGetRequest<GlobalStatistics>(apiUrl);
}
