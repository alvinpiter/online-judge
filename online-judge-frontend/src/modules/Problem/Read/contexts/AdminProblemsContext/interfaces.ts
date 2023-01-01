import { Problem } from "../../../interfaces";
import { AdminProblemsFilter } from "../../interfaces";

export interface AdminProblemsContextValue {
  currentPage: number;
  numberOfPages: number;
  problems: Problem[];

  handleFilterChange: (newFilter: AdminProblemsFilter) => void;
  handlePageChange: (newPage: number) => void;
}
