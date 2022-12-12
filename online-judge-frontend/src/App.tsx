import React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "./constants/Routes";

function App() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Judge
          </Typography>
        </Toolbar>
      </AppBar>
      <p>
        <Link to={ROUTES.EXAMPLE_SIMPLE_ROUTE.generatePath()}>Simple page</Link>
      </p>
      <p>
        <Link
          to={ROUTES.EXAMPLE_PARAMETERIZED_ROUTE.generatePath(
            { firstParameter: "p1", secondParameter: 2 },
            { firstQuery: "q1", secondQuery: 3 }
          )}
        >
          Parameterized page
        </Link>
      </p>
      <Outlet />
    </Box>
  );
}

export default App;
