import { useHTTPGetRequest } from "../../../lib/http/useHTTPGetRequest";

interface BackendHealthResponse {
  health: string;
}

export function useBackendHealth() {
  return useHTTPGetRequest<BackendHealthResponse>(
    "http://localhost:5000/api/health-check"
  );
}
