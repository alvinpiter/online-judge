import { Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSnackbarContext } from "../../../../../core/Snackbar";
import { ProblemDescriptionForm } from "../../../Create/components/ProblemDescriptionForm";
import { Problem, ProblemState } from "../../../interfaces";
import { useDraftProblemRequest } from "../hooks/useDraftProblemRequest";
import { useGetProblemRequest } from "../hooks/useGetProblemRequest";
import { usePublishProblemRequest } from "../hooks/usePublishProblemRequest";
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
    result: publishProblemResult,
    requestFunction: publishProblemRequest,
  } = usePublishProblemRequest(problemId);
  const { result: draftProblemResult, requestFunction: draftProblemRequest } =
    useDraftProblemRequest(problemId);

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

  useEffect(() => {
    if (publishProblemResult) {
      setCurrentProblem(publishProblemResult);
      openSnackbar("success", "Problem is published!");
    }
  }, [publishProblemResult, openSnackbar]);

  useEffect(() => {
    if (draftProblemResult) {
      setCurrentProblem(draftProblemResult);
      openSnackbar("success", "Problem is drafted!");
    }
  }, [draftProblemResult, openSnackbar]);

  return (
    <>
      {currentProblem &&
        (currentProblem.state === ProblemState.DRAFT ? (
          <Button variant="contained" onClick={() => publishProblemRequest({})}>
            Publish
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            onClick={() => draftProblemRequest({})}
          >
            Draft
          </Button>
        ))}
      {currentProblem && (
        <ProblemDescriptionForm
          initialName={currentProblem.name}
          initialDescription={currentProblem.description}
          initialRating={currentProblem.rating}
          onSubmit={updateProblem}
        />
      )}
    </>
  );
};
