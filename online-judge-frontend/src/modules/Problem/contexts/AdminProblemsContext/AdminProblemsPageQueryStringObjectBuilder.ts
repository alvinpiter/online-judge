import { BaseOffsetPaginationQueryStringObjectBuilder } from "../../../Pagination/OffsetPaginationQueryStringObjectBuilder/BaseOffsetPaginationQueryStringObjectBuilder";
import { QUERY_STRING_ORDER_KEY } from "../../../Pagination/OffsetPaginationQueryStringObjectBuilder/constants";
import {
  AdminProblemsFilter,
  AdminProblemsOrderOption,
  ProblemState,
} from "../../interfaces";

export class AdminProblemsPageQueryStringObjectBuilder extends BaseOffsetPaginationQueryStringObjectBuilder<
  AdminProblemsFilter,
  AdminProblemsOrderOption
> {
  getFilter(): AdminProblemsFilter {
    return {
      state: this.qsObject["state"] as ProblemState,
    };
  }

  setFilter(filter: AdminProblemsFilter) {
    this.qsObject = {
      ...this.qsObject,
      state: filter.state,
    };
    return this;
  }

  getOrder(): AdminProblemsOrderOption {
    return this.qsObject[QUERY_STRING_ORDER_KEY]
      ? (this.qsObject[QUERY_STRING_ORDER_KEY] as AdminProblemsOrderOption)
      : AdminProblemsOrderOption.BY_ID_ASC;
  }
}
