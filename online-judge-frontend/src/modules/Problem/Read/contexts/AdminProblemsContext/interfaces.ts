import { Problem } from "../../../interfaces";
import {
  AdminProblemsFilter,
  AdminProblemsOrderOption,
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
