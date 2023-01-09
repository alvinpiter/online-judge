import { config } from "../../../config";
import { useHTTPPostRequest } from "../../../lib/http/useHTTPPostRequest";
import { Problem } from "../interfaces";

export function useDraftProblemRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/problems/${problemId}/draft`;
  return useHTTPPostRequest<{}, Problem>(apiUrl);
}
