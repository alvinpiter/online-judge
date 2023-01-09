import { config } from "../../../config";
import { useHTTPPutRequest } from "../../../lib/http/useHTTPPutRequest";
import { Problem } from "../interfaces";

interface UpdateProblemRequestBody {
  name: string;
  description: string;
  rating: number;
}

export function useUpdateProblemRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/problems/${problemId}`;
  return useHTTPPutRequest<UpdateProblemRequestBody, Problem>(apiUrl);
}
