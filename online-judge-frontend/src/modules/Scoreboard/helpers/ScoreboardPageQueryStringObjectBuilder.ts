import { BaseOffsetPaginationQueryStringObjectBuilder } from "../../Pagination/OffsetPaginationQueryStringObjectBuilder";

export class ScoreboardPageQueryStringObjectBuilder extends BaseOffsetPaginationQueryStringObjectBuilder<
  any,
  any
> {
  getFilter() {
    return {};
  }

  setFilter(filter: any) {
    return this;
  }

  getOrder() {}
}
