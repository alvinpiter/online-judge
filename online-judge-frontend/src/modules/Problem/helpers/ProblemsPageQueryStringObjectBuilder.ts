import { BaseOffsetPaginationQueryStringObjectBuilder } from "../../Pagination/OffsetPaginationQueryStringObjectBuilder/BaseOffsetPaginationQueryStringObjectBuilder";
import { QUERY_STRING_ORDER_KEY } from "../../Pagination/OffsetPaginationQueryStringObjectBuilder/constants";
import {
  MAX_PROBLEM_RATING,
  MIN_PROBLEM_RATING,
  ProblemsFilter,
  ProblemsOrderOption,
  ProblemState,
} from "../interfaces";

export class ProblemsPageQueryStringObjectBuilder extends BaseOffsetPaginationQueryStringObjectBuilder<
  ProblemsFilter,
  ProblemsOrderOption
> {
  getFilter(): ProblemsFilter {
    return {
      state: this.qsObject["state"] as ProblemState,
      ratingGte:
        parseInt(this.qsObject["ratingGte"] as string) || MIN_PROBLEM_RATING,
      ratingLte:
        parseInt(this.qsObject["ratingLte"] as string) || MAX_PROBLEM_RATING,
    };
  }

  setFilter(filter: ProblemsFilter) {
    this.qsObject = {
      ...this.qsObject,
      state: filter.state,
      ratingGte: filter.ratingGte?.toString(),
      ratingLte: filter.ratingLte?.toString(),
    };
    return this;
  }

  getOrder(): ProblemsOrderOption {
    return this.qsObject[QUERY_STRING_ORDER_KEY]
      ? (this.qsObject[QUERY_STRING_ORDER_KEY] as ProblemsOrderOption)
      : ProblemsOrderOption.BY_ID_ASC;
  }
}
