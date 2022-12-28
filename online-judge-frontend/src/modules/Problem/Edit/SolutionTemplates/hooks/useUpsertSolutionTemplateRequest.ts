import { config } from "../../../../../config";
import { useHTTPPostRequest } from "../../../../../lib/http/useHTTPPostRequest";
import { ProgrammingLanguage } from "../../../interfaces";
import { SolutionTemplate } from "../interfaces";

interface UpsertSolutionTemplateRequestBody {
  programmingLanguage: ProgrammingLanguage;
  template: string;
}

export function useUpsertSolutionTemplateRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/problems/${problemId}/solution-templates`;
  return useHTTPPostRequest<
    UpsertSolutionTemplateRequestBody,
    SolutionTemplate
  >(apiUrl);
}
