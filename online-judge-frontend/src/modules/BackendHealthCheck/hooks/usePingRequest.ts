import { useHTTPPostRequest } from "../../../lib/hooks/useHTTPPostRequest";

interface PingRequestBody {
  message: string;
}

interface PingRequestResponse {
  message: string;
}

export function usePingRequest() {
  return useHTTPPostRequest<PingRequestBody, PingRequestResponse>(
    "http://localhost:5000/api/ping"
  );
}
