import { config } from "../../../config";
import { useHTTPPostRequest } from "../../../lib/http/useHTTPPostRequest";
import { Problem } from "../interfaces";

export function useDraftProblemRequest(problemId: number) {
  const apiUrl = `${config.backendAPIURL}/admin/problems/${problemId}/draft`;
  return useHTTPPostRequest<{}, Problem>(apiUrl);
}
