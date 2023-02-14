import { Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useSnackbarContext } from "../core/Snackbar";
import { ProblemDescriptionForm } from "../modules/Problem/components/EditDescription/ProblemDescriptionForm";
import { useCreateProblemRequest } from "../modules/Problem/hooks/useCreateProblemRequest";
import { SEOTitle } from "../modules/SEO/components/SEOTitle";

export const NewProblemPage: FC = () => {
  const { openSnackbar } = useSnackbarContext();

  const {
    result: createProblemResult,
    error: createProblemError,
    requestFunction: createProblemRequest,
  } = useCreateProblemRequest();

  const handleSubmit = (name: string, description: string, rating: number) => {
    createProblemRequest({ name, description, rating });
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
      <SEOTitle title="New Problem" />
      <Typography variant="h5"> New Problem </Typography>
      <ProblemDescriptionForm onSubmit={handleSubmit} />
    </>
  );
};
