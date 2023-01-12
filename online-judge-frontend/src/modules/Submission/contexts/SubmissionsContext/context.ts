import { createContextAndUseContextHook } from "../../../../lib/general/createContextAndUseContextHook";
import { SubmissionsContextValue } from "./interfaces";

export const [SubmissionsContext, useSubmissionsContext] =
  createContextAndUseContextHook<SubmissionsContextValue>("SubmissionsContext");
