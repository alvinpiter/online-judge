import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";

export interface ProblemTestCase {
  id: number;
  inputFile: {
    name: string;
    url: string;
  };
  outputFile: {
    name: string;
    url: string;
  };
}

export function useGetTestCaseRequest(problemId: string) {
  const apiUrl = `${config.backendAPIURL}/problems/${problemId}/test-cases`;
  return useHTTPGetRequest<ProblemTestCase[]>(apiUrl);
}
