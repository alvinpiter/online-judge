import { Alert, Snackbar } from "@mui/material";
import React, { FC, useCallback, useState } from "react";
import { useToggle } from "../../lib/general/useToggle";
import { SnackbarContext } from "./context";
import { SnackbarSeverity } from "./interfaces";

interface SnackbarContextProviderProps {
  children?: React.ReactNode;
}

export const SnackbarContextProvider: FC<SnackbarContextProviderProps> = ({
  children,
}) => {
  const [isSnackbarOpen, setSnackbarOpened, setSnackbarClosed] =
    useToggle(false);

  const [snackbarSeverity, setSnackbarSeverity] =
    useState<SnackbarSeverity>("success");

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const openSnackbar = useCallback(
    (severity: SnackbarSeverity, message: string) => {
      setSnackbarOpened();
      setSnackbarSeverity(severity);
      setSnackbarMessage(message);
    },
    []
  );

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    } else {
      setSnackbarClosed();
    }
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};
