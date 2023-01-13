import { config } from "../../../config";
import { useHTTPPostRequest } from "../../../lib/http/useHTTPPostRequest";
import { ProgrammingLanguage } from "../../Problem/interfaces";
import { Submission } from "../interfaces";

interface CreateSubmissionRequestBody {
  problemId: number;
  programmingLanguage: ProgrammingLanguage;
  code: string;
}

export function useCreateSubmissionRequest() {
  const apiUrl = `${config.backendAPIURL}/submissions`;
  return useHTTPPostRequest<CreateSubmissionRequestBody, Submission>(apiUrl);
}
