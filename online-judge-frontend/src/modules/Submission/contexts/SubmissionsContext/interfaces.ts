import { OffsetPaginationContextValue } from "../../../../lib/contexts/OffsetPaginationContext/interfaces";
import {
  Submission,
  SubmissionsFilter,
  SubmissionsOrderOption,
} from "../../interfaces";

export type SubmissionsContextValue = OffsetPaginationContextValue<
  Submission,
  SubmissionsFilter,
  SubmissionsOrderOption
>;
