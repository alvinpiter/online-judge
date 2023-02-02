export interface OffsetPaginationContextValue<Entity, Filter, Order> {
  currentPage: number;
  numberOfPages: number;
  filter: Filter;
  order: Order;

  entities: Entity[];

  handlePageChange: (newPage: number) => void;
  handleFilterChange: (newFilter: Filter) => void;
  handleOrderChange: (newOrder: Order) => void;
}

export const DEFAULT_NUMBER_OF_ENTITIES_PER_PAGE = 50;
