import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { Problem } from "../interfaces";

export function useGetAdminProblemRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/admin/problems/${problemId}`;
  return useHTTPGetRequest<Problem>(apiUrl);
}
