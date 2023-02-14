import { Box, CircularProgress } from "@mui/material";
import { FC } from "react";

export const LoadingState: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
