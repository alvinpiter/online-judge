import { Typography, Button } from "@mui/material";
import { FC } from "react";

import { useBackendHealthCheckContextValue } from "./modules/BackendHealthCheck/contexts/context";

export const PageWithSimplePath: FC = () => {
  const { result, recheck } = useBackendHealthCheckContextValue();

  return (
    <div>
      <h3> Page with simple path </h3>
      <p> We will perform backend health check here. </p>
      <Typography variant="body1" component="p">
        {result}
      </Typography>
      <Button variant="contained" onClick={() => recheck()}>
        Recheck
      </Button>
    </div>
  );
};
