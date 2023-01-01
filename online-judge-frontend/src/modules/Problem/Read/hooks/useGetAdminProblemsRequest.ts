import { stringify } from "qs";
import { config } from "../../../../config";
import { useHTTPGetRequest } from "../../../../lib/http/useHTTPGetRequest";
import { Problem } from "../../interfaces";
import { AdminProblemsFilter } from "../interfaces";

interface AdminProblemsRequestResponse {
  problems: Problem[];
  // TODO: define this meta somewhere? because it will be shared with other requests as well
  meta: {
    offset: number;
    limit: number;
    total: number;
  };
}

export function useGetAdminProblemsRequest(
  numberOfProblemsPerPage: number,
  page: number,
  filter?: AdminProblemsFilter
) {
  const offset = (page - 1) * numberOfProblemsPerPage;
  const limit = numberOfProblemsPerPage;

  const queryString = stringify(
    { offset, limit, ...filter },
    { addQueryPrefix: true }
  );

  const apiUrl = `${config.backendAPIURL}/problems${queryString}`;

  return useHTTPGetRequest<AdminProblemsRequestResponse>(apiUrl);
}
