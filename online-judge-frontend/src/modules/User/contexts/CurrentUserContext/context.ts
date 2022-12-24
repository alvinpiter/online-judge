import { createContextAndUseContextHook } from "../../../../lib/general/createContextAndUseContextHook";
import { CurrentUserContextValue } from "./interface";

export const [CurrentUserContext, useCurrentUserContext] =
  createContextAndUseContextHook<CurrentUserContextValue>("CurrentUserContext");
