import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";

export const PlaygroundPage: FC = () => {
  return (
    <>
      <Typography variant="h4"> Playground </Typography>

      <Box sx={{ mt: 2 }}>
        <NodeContainer />
      </Box>
    </>
  );
};

const NodeContainer: FC = () => {
  return (
    <Paper elevation={2} sx={{ padding: 1, display: "inline-block" }}>
      <Typography variant="body1"> ID: 1, order: 0 </Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <Button size="small" variant="contained">
          Add above
        </Button>
        <Button size="small" variant="contained">
          Add below
        </Button>
        <Button size="small" variant="contained">
          Add child
        </Button>
        <Button size="small" variant="contained" color="warning">
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};
