import QueryString from "qs";

export interface QueryStringObjectBuilder<Filter, Order> {
  getPage: () => number;
  setPage: (page: number) => QueryStringObjectBuilder<Filter, Order>;

  getFilter: () => Filter;
  setFilter: (filter: Filter) => QueryStringObjectBuilder<Filter, Order>;

  getOrder: () => Order;
  setOrder: (order: Order) => QueryStringObjectBuilder<Filter, Order>;

  build: () => QueryString.ParsedQs;
}
