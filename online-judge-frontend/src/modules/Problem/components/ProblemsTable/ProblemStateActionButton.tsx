import { Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSnackbarContext } from "../../../../core/Snackbar";
import { useDraftProblemRequest } from "../../hooks/useDraftProblemRequest";
import { usePublishProblemRequest } from "../../hooks/usePublishProblemRequest";
import { Problem, ProblemState } from "../../interfaces";

interface ProblemStateActionButtonProps {
  problem: Problem;
}

export const ProblemStateActionButton: FC<ProblemStateActionButtonProps> = ({
  problem,
}) => {
  const [currentProblem, setCurrentProblem] = useState(problem);

  const {
    result: publishProblemResult,
    requestFunction: publishProblemRequest,
  } = usePublishProblemRequest(problem.id);
  const { result: draftProblemResult, requestFunction: draftProblemRequest } =
    useDraftProblemRequest(problem.id);

  const { openSnackbar } = useSnackbarContext();

  useEffect(() => {
    if (publishProblemResult) {
      setCurrentProblem(publishProblemResult);
      openSnackbar(
        "success",
        `Problem ${publishProblemResult.name} is published!`
      );
    }
  }, [publishProblemResult, openSnackbar]);

  useEffect(() => {
    if (draftProblemResult) {
      setCurrentProblem(draftProblemResult);
      openSnackbar("success", `Problem ${draftProblemResult.name} is drafted!`);
    }
  }, [draftProblemResult, openSnackbar]);

  return (
    <>
      {currentProblem.state === ProblemState.DRAFT ? (
        <Button
          variant="contained"
          color="success"
          onClick={() => publishProblemRequest({})}
        >
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
      )}
    </>
  );
};
