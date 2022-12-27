import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { ProblemSolutionTemplate } from "../interfaces";

export function useGetSolutionTemplatesRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/problems/${problemId}/solution-templates`;
  return useHTTPGetRequest<ProblemSolutionTemplate[]>(apiUrl);
}
