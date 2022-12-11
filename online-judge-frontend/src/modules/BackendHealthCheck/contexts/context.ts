import { createContextAndUseContextHook } from "../../../lib/createContextAndUseContextHook";
import { BackendHealthCheckContextValue } from "./interface";

export const [BackendHealthCheckContext, useBackendHealthCheckContextValue] =
  createContextAndUseContextHook<BackendHealthCheckContextValue>(
    "BackendHealthCheck"
  );
