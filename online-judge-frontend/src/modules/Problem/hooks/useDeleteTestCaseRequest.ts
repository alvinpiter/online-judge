import { config } from "../../../config";
import { useHTTPDeleteRequest } from "../../../lib/http/useHTTPDeleteRequest";

export function useDeleteTestCaseRequest(
  problemId: number,
  testCaseId: number
) {
  const apiUrl = `${config.backendAPIURL}/problems/${problemId}/test-cases/${testCaseId}`;
  return useHTTPDeleteRequest<string>(apiUrl);
}
