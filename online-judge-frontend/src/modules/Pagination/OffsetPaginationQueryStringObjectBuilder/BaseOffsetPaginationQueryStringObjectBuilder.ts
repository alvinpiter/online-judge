import QueryString, { parse } from "qs";
import { QUERY_STRING_ORDER_KEY, QUERY_STRING_PAGE_KEY } from "./constants";
import { OffsetPaginationQueryStringObjectBuilder } from "./OffsetPaginationQueryStringObjectBuilder";

export abstract class BaseOffsetPaginationQueryStringObjectBuilder<
  Filter,
  Order
> implements OffsetPaginationQueryStringObjectBuilder<Filter, Order>
{
  protected qsObject: QueryString.ParsedQs;

  constructor(queryString: string) {
    this.qsObject = parse(queryString);
  }

  getPage() {
    return parseInt(this.qsObject[QUERY_STRING_PAGE_KEY] as string) || 1;
  }

  setPage(page: number) {
    this.qsObject[QUERY_STRING_PAGE_KEY] = page.toString();
    return this;
  }

  setOrder(order: Order) {
    this.qsObject[QUERY_STRING_ORDER_KEY] = order as string;
    return this;
  }

  build() {
    return this.qsObject;
  }

  abstract getFilter(): Filter;
  abstract setFilter(
    filter: Filter
  ): OffsetPaginationQueryStringObjectBuilder<Filter, Order>;

  abstract getOrder(): Order;
}
