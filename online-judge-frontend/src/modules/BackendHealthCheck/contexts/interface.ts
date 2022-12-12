export interface BackendHealthCheckContextValue {
  result: string;
  recheck: () => Promise<void>;
}
