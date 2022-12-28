import { Button } from "@mui/material";
import { FC } from "react";
import { useSnackbarContext } from "../core/Snackbar";

export const PlaygroundPage: FC = () => {
  const { openSnackbar } = useSnackbarContext();

  return (
    <>
      <Button
        onClick={() => openSnackbar("success", "success")}
        variant="contained"
        color="success"
      >
        Open success snackbar
      </Button>

      <Button
        onClick={() => openSnackbar("error", "error")}
        variant="contained"
        color="error"
      >
        Open error snackbar
      </Button>
    </>
  );
};
