import { Typography, Button, Box } from "@mui/material";
import { FC } from "react";

import { useBackendHealthCheckContextValue } from "./modules/BackendHealthCheck/contexts/context";

export const PageWithSimplePath: FC = () => {
  const { result, recheck } = useBackendHealthCheckContextValue();

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
    </div>
  );
};
