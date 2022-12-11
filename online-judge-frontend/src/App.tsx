import React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Online Judge
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default App;
