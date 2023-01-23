import { config } from "../../../config";
import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";
import { constructPaginationQueryString } from "../../Pagination/helpers";
import { OffsetPaginationResult } from "../../Pagination/interfaces";
import { ScoreboardRow } from "../interfaces";

export function useGetScoreboardRowsRequest(
  numberOfRowsPerPage: number,
  page: number
) {
  const queryString = constructPaginationQueryString(numberOfRowsPerPage, page);
  const apiUrl = `${config.backendAPIURL}/scoreboard${queryString}`;

  return useHTTPGetRequest<OffsetPaginationResult<ScoreboardRow>>(apiUrl);
}
