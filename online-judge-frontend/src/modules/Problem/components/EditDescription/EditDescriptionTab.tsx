import { FC, useEffect, useState } from "react";
import { useSnackbarContext } from "../../../../core/Snackbar";
import { ProblemDescriptionForm } from "./ProblemDescriptionForm";
import { Problem } from "../../interfaces";
import { useGetAdminProblemRequest } from "../../hooks/useGetAdminProblemRequest";
import { useUpdateProblemRequest } from "../../hooks/useUpdateProblemRequest";
import { Box } from "@mui/material";

export const EditDescriptionTab: FC<{ problemId: string }> = ({
  problemId,
}) => {
  const { openSnackbar } = useSnackbarContext();

  const [currentProblem, setCurrentProblem] = useState<Problem | undefined>(
    undefined
  );

  const { result: getProblemRequestResult } =
    useGetAdminProblemRequest(problemId);

  const {
    result: updateProblemRequestResult,
    error: updateProblemRequestError,
    requestFunction: updateProblemRequest,
  } = useUpdateProblemRequest(problemId);

  const updateProblem = (name: string, description: string, rating: number) => {
    updateProblemRequest({ name, description, rating });
  };

  useEffect(() => {
    if (updateProblemRequestResult) {
      openSnackbar("success", "Problem is updated!");
    }
  }, [updateProblemRequestResult, openSnackbar]);

  useEffect(() => {
    if (updateProblemRequestError) {
      openSnackbar("error", updateProblemRequestError.message);
    }
  }, [updateProblemRequestError, openSnackbar]);

  useEffect(() => {
    if (getProblemRequestResult) {
      setCurrentProblem(getProblemRequestResult);
    }
  }, [getProblemRequestResult]);

  return (
    <>
      {currentProblem && (
        <Box sx={{ mt: 2 }}>
          <ProblemDescriptionForm
            problem={currentProblem}
            onSubmit={updateProblem}
          />
        </Box>
      )}
    </>
  );
};
