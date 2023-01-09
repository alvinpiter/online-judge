import { config } from "../../../config";
import { useHTTPPostRequest } from "../../../lib/http/useHTTPPostRequest";
import { Problem } from "../interfaces";

export function usePublishProblemRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/admin/problems/${problemId}/publish`;
  return useHTTPPostRequest<{}, Problem>(apiUrl);
}
