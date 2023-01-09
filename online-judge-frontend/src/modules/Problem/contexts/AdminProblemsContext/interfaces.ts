import {
  AdminProblemsFilter,
  AdminProblemsOrderOption,
  Problem,
} from "../../interfaces";

export interface AdminProblemsContextValue {
  currentPage: number;
  numberOfPages: number;
  filter: AdminProblemsFilter;
  order: AdminProblemsOrderOption;
  problems: Problem[];

  handleFilterChange: (newFilter: AdminProblemsFilter) => void;
  handlePageChange: (newPage: number) => void;
  handleOrderChange: (newOrder: AdminProblemsOrderOption) => void;
}
