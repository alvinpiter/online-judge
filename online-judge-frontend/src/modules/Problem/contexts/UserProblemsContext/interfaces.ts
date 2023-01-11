import { OffsetPaginationContextValue } from "../../../../lib/contexts/OffsetPaginationContext/interfaces";
import { ProblemsFilter, ProblemsOrderOption, Problem } from "../../interfaces";

export type UserProblemsContextValue = OffsetPaginationContextValue<
  Problem,
  ProblemsFilter,
  ProblemsOrderOption
>;
