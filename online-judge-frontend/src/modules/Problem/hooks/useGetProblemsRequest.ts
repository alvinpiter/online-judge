import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { constructPaginationQueryString } from "../../Pagination/helpers";
import { OffsetPaginationResult } from "../../Pagination/interfaces";
import {
  ProblemsFilter,
  ProblemsOrderOption,
  ProblemWithDetail,
} from "../interfaces";

// TODO: Refactor. Similar with useGetAdminProblemsRequest.
export function useGetProblemsRequest(
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
  const apiUrl = `${config.backendAPIURL}/problems${queryString}`;

  return useHTTPGetRequest<OffsetPaginationResult<ProblemWithDetail>>(apiUrl);
}
