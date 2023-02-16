export interface OffsetPaginationContextValue<Entity, Filter, Order> {
  currentPage: number;
  numberOfPages: number;
  filter: Filter;
  order: Order;

  isLoadingEntities: boolean;
  entities: Entity[];

  handlePageChange: (newPage: number) => void;
  handleFilterChange: (newFilter: Filter) => void;
  handleOrderChange: (newOrder: Order) => void;
}
