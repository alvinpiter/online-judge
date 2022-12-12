import { useHTTPGetRequest } from "../../../lib/hooks/useHTTPGetRequest";

interface BackendHealthResponse {
  health: string;
}

export function useBackendHealth() {
  return useHTTPGetRequest<BackendHealthResponse>(
    "http://localhost:5000/api/health-check"
  );
}
