import { createContextAndUseContextHook } from "../../../../lib/general/createContextAndUseContextHook";
import { TreeNodeContextValue } from "./interfaces";

export const [TreeNodeContext, useTreeNodeContext] =
  createContextAndUseContextHook<TreeNodeContextValue>("TreeNodeContext");
