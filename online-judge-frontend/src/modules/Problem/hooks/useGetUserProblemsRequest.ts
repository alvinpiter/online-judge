import { stringify } from "qs";
import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { OffsetPaginationResult } from "../../Pagination/interfaces";
import { ProblemsFilter, ProblemsOrderOption, Problem } from "../interfaces";

// TODO: Refactor. Similar with useGetAdminProblemsRequest.
export function useGetUserProblemsRequest(
  numberOfProblemsPerPage: number,
  page: number,
  filter?: ProblemsFilter,
  order?: ProblemsOrderOption
) {
  const offset = (page - 1) * numberOfProblemsPerPage;
  const limit = numberOfProblemsPerPage;

  const queryString = stringify(
    { offset, limit, ...filter, order },
    { addQueryPrefix: true }
  );

  const apiUrl = `${config.backendAPIURL}/problems${queryString}`;

  return useHTTPGetRequest<OffsetPaginationResult<Problem>>(apiUrl);
}
