import { createContextAndUseContextHook } from "../../../../lib/createContextAndUseContextHook";
import { CurrentUserContextValue } from "./interface";

export const [CurrentUserContext, useCurrentUserContext] =
  createContextAndUseContextHook<CurrentUserContextValue>("CurrentUserContext");
