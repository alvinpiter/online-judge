import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { Problem } from "../../Problem/interfaces";

export function useGetScoreboardProblemsRequest() {
  const apiUrl = `${config.backendAPIURL}/scoreboard/problems`;
  return useHTTPGetRequest<Problem[]>(apiUrl);
}
