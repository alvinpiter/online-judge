import { ProblemsOrderOption } from "../interfaces";

export function humanizeProblemsOrderOption(order: ProblemsOrderOption) {
  switch (order) {
    case ProblemsOrderOption.BY_ID_ASC:
      return "ID (ascending)";
    case ProblemsOrderOption.BY_ID_DESC:
      return "ID (descending)";
    case ProblemsOrderOption.BY_RATING_ASC:
      return "Rating (ascending)";
    case ProblemsOrderOption.BY_RATING_DESC:
      return "Rating (descending)";
    case ProblemsOrderOption.BY_SOLVER_COUNT_ASC:
      return "Solver count (ascending)";
    case ProblemsOrderOption.BY_SOLVER_COUNT_DESC:
      return "Solver count (descending)";
  }
}
