import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { SubmissionWithDetails } from "../interfaces";

export function useGetSubmissionWithDetailsRequest(submissionId: number) {
  const apiUrl = `${config.backendAPIURL}/submissions/${submissionId}`;
  return useHTTPGetRequest<SubmissionWithDetails>(apiUrl);
}
