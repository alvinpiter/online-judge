import { Box } from "@mui/material";
import { FC } from "react";
import { useGetProblemRequest } from "../../hooks/useGetProblemRequest";
import { ProblemDescriptionTabCodeEditor } from "./ProblemDescriptionTabCodeEditor";

interface ProblemDescriptionTabProps {
  problemId: string;
}

export const ProblemDescriptionTab: FC<ProblemDescriptionTabProps> = ({
  problemId,
}) => {
  const { isLoading: isLoadingProblem, result: getProblemResult } =
    useGetProblemRequest(problemId);

  if (isLoadingProblem || !getProblemResult) {
    return <p> Loading problem... </p>;
  }

  return (
    <>
      <div
        style={{ width: "100%", backgroundColor: "#F1F1F1" }}
        dangerouslySetInnerHTML={{ __html: getProblemResult.description }}
      />
      <Box sx={{ mt: 2 }}>
        <ProblemDescriptionTabCodeEditor problemId={problemId} />
      </Box>
    </>
  );
};
