import { OffsetPaginationContextValue } from "../../../../lib/contexts/OffsetPaginationContext/interfaces";
import {
  ProblemsFilter,
  ProblemsOrderOption,
  ProblemWithDetail,
} from "../../interfaces";

export type UserProblemsContextValue = OffsetPaginationContextValue<
  ProblemWithDetail,
  ProblemsFilter,
  ProblemsOrderOption
>;
