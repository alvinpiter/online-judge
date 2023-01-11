import { createContextAndUseContextHook } from "../../../../lib/general/createContextAndUseContextHook";
import { UserProblemsContextValue } from "./interfaces";

export const [UserProblemsContext, useUserProblemsContext] =
  createContextAndUseContextHook<UserProblemsContextValue>(
    "AdminProblemsContext"
  );
