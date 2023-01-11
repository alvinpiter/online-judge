import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { constructPaginationQueryString } from "../../Pagination/helpers";
import { OffsetPaginationResult } from "../../Pagination/interfaces";
import { ProblemsFilter, ProblemsOrderOption, Problem } from "../interfaces";

export function useGetAdminProblemsRequest(
  numberOfProblemsPerPage: number,
  page: number,
  filter?: ProblemsFilter,
  order?: ProblemsOrderOption
) {
  const queryString = constructPaginationQueryString(
    numberOfProblemsPerPage,
    page,
    filter,
    order
  );
  const apiUrl = `${config.backendAPIURL}/admin/problems${queryString}`;

  return useHTTPGetRequest<OffsetPaginationResult<Problem>>(apiUrl);
}
