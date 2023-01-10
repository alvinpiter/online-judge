import QueryString from "qs";

/*
TODO:
Find correct type for setPage, setFilter, and setOrder.
Those methods should return the instance of the implementor.
 */
export interface QueryStringObjectBuilder<Filter, Order> {
  getPage: () => number;
  setPage: (page: number) => void;

  getFilter: () => Filter;
  setFilter: (filter: Filter) => void;

  getOrder: () => Order;
  setOrder: (order: Order) => void;

  build: () => QueryString.ParsedQs;
}
