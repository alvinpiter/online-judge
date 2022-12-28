import { FC, useEffect, useState } from "react";
import { useSnackbarContext } from "../../../../../core/Snackbar";
import { ProblemDescriptionForm } from "../../../Create/components/ProblemDescriptionForm";
import { Problem } from "../../../interfaces";
import { useGetProblemRequest } from "../hooks/useGetProblemRequest";
import { useUpdateProblemRequest } from "../hooks/useUpdateProblemRequest";

export const EditDescriptionTab: FC<{ problemId: string }> = ({
  problemId,
}) => {
  const { openSnackbar } = useSnackbarContext();

  const [currentProblem, setCurrentProblem] = useState<Problem | undefined>(
    undefined
  );

  const { result: getProblemRequestResult } = useGetProblemRequest(problemId);

  const {
    result: updateProblemRequestResult,
    error: updateProblemRequestError,
    requestFunction: updateProblemRequest,
  } = useUpdateProblemRequest(problemId);

  const updateProblem = (name: string, description: string) => {
    updateProblemRequest({ name, description });
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
        <ProblemDescriptionForm
          initialName={currentProblem.name}
          initialDescription={currentProblem.description}
          onSubmit={updateProblem}
        />
      )}
    </>
  );
};
