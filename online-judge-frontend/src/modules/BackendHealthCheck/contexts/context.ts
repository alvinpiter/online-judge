import { createContextAndUseContextHook } from "../../../lib/general/createContextAndUseContextHook";
import { BackendHealthCheckContextValue } from "./interface";

export const [BackendHealthCheckContext, useBackendHealthCheckContextValue] =
  createContextAndUseContextHook<BackendHealthCheckContextValue>(
    "BackendHealthCheck"
  );
