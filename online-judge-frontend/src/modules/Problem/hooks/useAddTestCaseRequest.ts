import { config } from "../../../config";
import { useHTTPPostRequest } from "../../../lib/http/useHTTPPostRequest";
import { ProblemTestCase } from "./useGetTestCasesRequest";

export function useAddTestCaseRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/problems/${problemId}/test-cases`;
  return useHTTPPostRequest<FormData, ProblemTestCase>(apiUrl);
}
