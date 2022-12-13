import { Typography, Button, Box } from "@mui/material";
import { FC } from "react";

import { useBackendHealthCheckContextValue } from "./modules/BackendHealthCheck/contexts/context";
import { usePingRequest } from "./modules/BackendHealthCheck/hooks/usePingRequest";

export const PageWithSimplePath: FC = () => {
  const { result, recheck } = useBackendHealthCheckContextValue();
  const {
    isLoading: isPingRequestLoading,
    result: pingResult,
    error: pingError,
    requestFunction: pingRequest,
  } = usePingRequest();

  const ping = () => {
    pingRequest({ message: "Alvin" });
  };

  return (
    <div>
      <h3> Page with simple path </h3>

      <Box>
        <Button variant="contained" onClick={() => recheck()}>
          Check backend health
        </Button>
        <Typography variant="body1" component="p">
          {result}
        </Typography>
      </Box>

      <Box marginTop={2}>
        <Button variant="contained" onClick={() => ping()}>
          Ping backend
        </Button>
        <Typography variant="body1" component="p">
          {isPingRequestLoading
            ? "Loading..."
            : pingError
            ? pingError.message
            : pingResult?.message}
        </Typography>
      </Box>
    </div>
  );
};
