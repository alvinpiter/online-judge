import { config } from "../../../../config";
import { useHTTPPostRequest } from "../../../../lib/http/useHTTPPostRequest";
import { Problem } from "../../interfaces";

interface CreateProblemRequestBody {
  name: string;
  description: string;
}

export function useCreateProblemRequest() {
  const apiUrl = `${config.backendAPIURL}/problems`;
  return useHTTPPostRequest<CreateProblemRequestBody, Problem>(apiUrl);
}
