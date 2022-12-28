import { config } from "../../../../../config";
import { useHTTPGetRequest } from "../../../../../lib/http/useHTTPGetRequest";
import { SolutionTemplate } from "../interfaces";

export function useGetSolutionTemplatesRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/problems/${problemId}/solution-templates`;
  return useHTTPGetRequest<SolutionTemplate[]>(apiUrl);
}
