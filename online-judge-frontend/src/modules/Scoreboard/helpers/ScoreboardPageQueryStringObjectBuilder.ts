import { BaseOffsetPaginationQueryStringObjectBuilder } from "../../Pagination/OffsetPaginationQueryStringObjectBuilder";
import { ScoreboardFilter } from "../interfaces";

export class ScoreboardPageQueryStringObjectBuilder extends BaseOffsetPaginationQueryStringObjectBuilder<
  ScoreboardFilter,
  any
> {
  getFilter(): ScoreboardFilter {
    return {
      userIds: this.qsObject["userIds"] as string,
    };
  }

  setFilter(filter: ScoreboardFilter) {
    this.qsObject = { ...filter };
    return this;
  }

  getOrder() {}
}
