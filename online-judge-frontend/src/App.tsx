import React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";
import { useBackendHealthCheckContextValue } from "./modules/BackendHealthCheck/contexts/context";

function App() {
  const { isBackendHealthy } = useBackendHealthCheckContextValue();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Online Judge
        </Typography>
        <Typography variant="body1" component="span">
          {isBackendHealthy ? "OK" : ""}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default App;
