import QueryString from "qs";

export interface OffsetPaginationQueryStringObjectBuilder<Filter, Order> {
  getPage: () => number;
  setPage: (
    page: number
  ) => OffsetPaginationQueryStringObjectBuilder<Filter, Order>;

  getFilter: () => Filter;
  setFilter: (
    filter: Filter
  ) => OffsetPaginationQueryStringObjectBuilder<Filter, Order>;

  getOrder: () => Order;
  setOrder: (
    order: Order
  ) => OffsetPaginationQueryStringObjectBuilder<Filter, Order>;

  build: () => QueryString.ParsedQs;
}
