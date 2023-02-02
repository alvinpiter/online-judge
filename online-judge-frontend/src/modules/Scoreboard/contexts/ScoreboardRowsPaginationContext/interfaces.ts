import { OffsetPaginationContextValue } from "../../../../lib/contexts/OffsetPaginationContext/interfaces";
import { ScoreboardRow } from "../../interfaces";

export type ScoreboardRowsPaginationContextValue = OffsetPaginationContextValue<
  ScoreboardRow,
  any,
  any
>;
