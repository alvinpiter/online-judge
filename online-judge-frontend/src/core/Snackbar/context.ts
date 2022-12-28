import { createContextAndUseContextHook } from "../../lib/general/createContextAndUseContextHook";
import { SnackbarContextValue } from "./interfaces";

export const [SnackbarContext, useSnackbarContext] =
  createContextAndUseContextHook<SnackbarContextValue>("SnackbarContext");
