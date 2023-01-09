import { config } from "../../../config";
import { useHTTPPostRequest } from "../../../lib/http/useHTTPPostRequest";
import { Problem } from "../interfaces";

interface CreateProblemRequestBody {
  name: string;
  description: string;
  rating: number;
}

export function useCreateProblemRequest() {
  const apiUrl = `${config.backendAPIURL}/admin/problems`;
  return useHTTPPostRequest<CreateProblemRequestBody, Problem>(apiUrl);
}
