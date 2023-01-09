import { createContextAndUseContextHook } from "../../../../lib/general/createContextAndUseContextHook";
import { EditSolutionTemplatesContextValue } from "./interfaces";

export const [EditSolutionTemplatesContext, useEditSolutionTemplatesContext] =
  createContextAndUseContextHook<EditSolutionTemplatesContextValue>(
    "EditSolutionTemplatesContext"
  );
