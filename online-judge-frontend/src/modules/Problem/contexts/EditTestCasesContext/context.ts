import { createContextAndUseContextHook } from "../../../../lib/general/createContextAndUseContextHook";
import { EditTestCasesContextValue } from "./interfaces";

export const [EditTestCasesContext, useEditTestCasesContext] =
  createContextAndUseContextHook<EditTestCasesContextValue>(
    "EditTestCaseContext"
  );
