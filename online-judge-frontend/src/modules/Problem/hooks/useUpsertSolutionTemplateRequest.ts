import { config } from "../../../config";
import { useHTTPPostRequest } from "../../../lib/http/useHTTPPostRequest";
import { ProgrammingLanguage, SolutionTemplate } from "../interfaces";

interface UpsertSolutionTemplateRequestBody {
  programmingLanguage: ProgrammingLanguage;
  template: string;
}

export function useUpsertSolutionTemplateRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/admin/problems/${problemId}/solution-templates`;
  return useHTTPPostRequest<
    UpsertSolutionTemplateRequestBody,
    SolutionTemplate
  >(apiUrl);
}
