import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { constructPaginationQueryString } from "../../Pagination/helpers";
import { OffsetPaginationResult } from "../../Pagination/interfaces";
import {
  Submission,
  SubmissionsFilter,
  SubmissionsOrderOption,
} from "../interfaces";

export function useGetSubmissionsRequest(
  numberOfSubmissionsPerPage: number,
  page: number,
  filter?: SubmissionsFilter,
  order?: SubmissionsOrderOption
) {
  const queryString = constructPaginationQueryString(
    numberOfSubmissionsPerPage,
    page,
    filter,
    order
  );
  const apiUrl = `${config.backendAPIURL}/submissions${queryString}`;

  return useHTTPGetRequest<OffsetPaginationResult<Submission>>(apiUrl);
}
