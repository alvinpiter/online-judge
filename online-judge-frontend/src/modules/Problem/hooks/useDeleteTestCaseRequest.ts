import { config } from "../../../config";
import { useHTTPDeleteRequest } from "../../../lib/http/useHTTPDeleteRequest";
import { TestCase } from "../interfaces";

interface UrlParameters {
  problemId: string;
  testCaseId: string;
}

export function useDeleteTestCaseRequest() {
  return useHTTPDeleteRequest<UrlParameters, TestCase>(
    (urlParameters: UrlParameters) =>
      `${config.backendAPIURL}/problems/${urlParameters.problemId}/test-cases/${urlParameters.testCaseId}`
  );
}
