import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { Problem } from "../interfaces";

export function useGetProblemRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/problems/${problemId}`;
  return useHTTPGetRequest<Problem>(apiUrl);
}
