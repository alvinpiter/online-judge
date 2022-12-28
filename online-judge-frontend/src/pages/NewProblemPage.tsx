import { Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useSnackbarContext } from "../core/Snackbar";
import { ProblemDescriptionForm } from "../modules/Problem/Create/components/ProblemDescriptionForm";
import { useCreateProblemRequest } from "../modules/Problem/Create/hooks/useCreateProblemRequest";

export const NewProblemPage: FC = () => {
  const { openSnackbar } = useSnackbarContext();

  const {
    result: createProblemResult,
    error: createProblemError,
    requestFunction: createProblemRequest,
  } = useCreateProblemRequest();

  const handleSubmit = (name: string, description: string) => {
    createProblemRequest({ name, description });
  };

  useEffect(() => {
    if (createProblemResult) {
      openSnackbar("success", "Problem is created!");
    }
  }, [createProblemResult, openSnackbar]);

  useEffect(() => {
    if (createProblemError) {
      openSnackbar("error", createProblemError.message);
    }
  }, [createProblemError, openSnackbar]);

  return (
    <>
      <Typography variant="h5"> New Problem </Typography>
      <ProblemDescriptionForm onSubmit={handleSubmit} />
    </>
  );
};
