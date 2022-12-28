export type SnackbarSeverity = "success" | "error";

export interface SnackbarContextValue {
  openSnackbar: (severity: SnackbarSeverity, message: string) => void;
}
