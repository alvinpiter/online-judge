import { BaseQueryStringObjectBuilder } from "../../../../lib/QueryStringObjectBuilder/BaseQueryStringObjectBuilder";
import { QUERY_STRING_ORDER_KEY } from "../../../../lib/QueryStringObjectBuilder/constants";
import {
  AdminProblemsFilter,
  AdminProblemsOrderOption,
  ProblemState,
} from "../../interfaces";

export class AdminProblemsPageQueryStringObjectBuilder extends BaseQueryStringObjectBuilder<
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
