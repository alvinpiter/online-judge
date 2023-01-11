import { stringify } from "qs";
import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { OffsetPaginationResult } from "../../Pagination/interfaces";
import { ProblemsFilter, ProblemsOrderOption, Problem } from "../interfaces";

export function useGetAdminProblemsRequest(
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

  const apiUrl = `${config.backendAPIURL}/admin/problems${queryString}`;

  return useHTTPGetRequest<OffsetPaginationResult<Problem>>(apiUrl);
}
