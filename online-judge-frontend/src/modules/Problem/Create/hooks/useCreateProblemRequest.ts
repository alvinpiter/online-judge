import { config } from "../../../../config";
import { useHTTPPostRequest } from "../../../../lib/http/useHTTPPostRequest";

interface CreateProblemRequestBody {
  name: string;
  description: string;
}

interface CreateProblemRequestResponse {
  id: number;
  name: string;
  description: string;
  state: string;
}

export function useCreateProblemRequest() {
  const apiUrl = `${config.backendAPIURL}/problems`;
  return useHTTPPostRequest<
    CreateProblemRequestBody,
    CreateProblemRequestResponse
  >(apiUrl);
}
