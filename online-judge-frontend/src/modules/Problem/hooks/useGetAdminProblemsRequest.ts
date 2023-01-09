import { stringify } from "qs";
import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { OffsetPaginationMeta } from "../../Pagination/interfaces";
import {
  AdminProblemsFilter,
  AdminProblemsOrderOption,
  Problem,
} from "../interfaces";

interface AdminProblemsRequestResponse {
  problems: Problem[];
  meta: OffsetPaginationMeta;
}

export function useGetAdminProblemsRequest(
  numberOfProblemsPerPage: number,
  page: number,
  filter?: AdminProblemsFilter,
  order?: AdminProblemsOrderOption
) {
  const offset = (page - 1) * numberOfProblemsPerPage;
  const limit = numberOfProblemsPerPage;

  const queryString = stringify(
    { offset, limit, ...filter, order },
    { addQueryPrefix: true }
  );

  const apiUrl = `${config.backendAPIURL}/admin/problems${queryString}`;

  return useHTTPGetRequest<AdminProblemsRequestResponse>(apiUrl);
}
