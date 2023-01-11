import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { SolutionTemplate } from "../interfaces";

export function useGetAdminSolutionTemplatesRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/admin/problems/${problemId}/solution-templates`;
  return useHTTPGetRequest<SolutionTemplate[]>(apiUrl);
}
