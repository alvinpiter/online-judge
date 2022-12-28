import { config } from "../../../config";
import { useHTTPDeleteRequest } from "../../../lib/http/useHTTPDeleteRequest";

interface UrlParameters {
  problemId: number;
  testCaseId: number;
}

export function useDeleteTestCaseRequest() {
  return useHTTPDeleteRequest<UrlParameters, string>(
    (urlParameters: UrlParameters) =>
      `${config.backendAPIURL}/problems/${urlParameters.problemId}/test-cases/${urlParameters.testCaseId}`
  );
}
