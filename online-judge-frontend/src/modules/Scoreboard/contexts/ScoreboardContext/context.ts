import { createContextAndUseContextHook } from "../../../../lib/general/createContextAndUseContextHook";
import { ScoreboardContextValue } from "./interfaces";

export const [ScoreboardContext, useScoreboardContext] =
  createContextAndUseContextHook<ScoreboardContextValue>("ScoreboardContext");
