import { createContextAndUseContextHook } from "../../../../lib/general/createContextAndUseContextHook";
import { ScoreboardRowsPaginationContextValue } from "./interfaces";

export const [
  ScoreboardRowsPaginationContext,
  useScoreboardRowsPaginationContext,
] = createContextAndUseContextHook<ScoreboardRowsPaginationContextValue>(
  "ScoreboardRowsPaginationContext"
);
