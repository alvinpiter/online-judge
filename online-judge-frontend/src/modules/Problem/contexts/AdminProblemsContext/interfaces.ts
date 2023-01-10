import { OffsetPaginationContextValue } from "../../../../lib/contexts/OffsetPaginationContext/interfaces";
import {
  AdminProblemsFilter,
  AdminProblemsOrderOption,
  Problem,
} from "../../interfaces";

export type AdminProblemsContextValue = OffsetPaginationContextValue<
  Problem,
  AdminProblemsFilter,
  AdminProblemsOrderOption
>;
