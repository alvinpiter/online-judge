import React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import { useBackendHealthCheckContextValue } from "./modules/BackendHealthCheck/contexts/context";

function App() {
  const { result, recheck } = useBackendHealthCheckContextValue();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Judge
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="body1" component="p">
        {result}
      </Typography>
      <Button variant="contained" onClick={() => recheck()}>
        Recheck
      </Button>
    </Box>
  );
}

export default App;
