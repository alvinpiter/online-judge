import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { SolutionTemplate } from "../interfaces";

export function useGetUserSolutionTemplatesRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/problems/${problemId}/solution-templates`;
  return useHTTPGetRequest<SolutionTemplate[]>(apiUrl);
}
