import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { TestCase } from "../interfaces";

export function useGetTestCaseRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/problems/${problemId}/test-cases`;
  return useHTTPGetRequest<TestCase[]>(apiUrl);
}
