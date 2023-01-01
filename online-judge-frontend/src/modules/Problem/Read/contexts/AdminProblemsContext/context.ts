import { createContextAndUseContextHook } from "../../../../../lib/general/createContextAndUseContextHook";
import { AdminProblemsContextValue } from "./interfaces";

export const [AdminProblemsContext, useAdminProblemsContext] =
  createContextAndUseContextHook<AdminProblemsContextValue>(
    "AdminProblemsContext"
  );
