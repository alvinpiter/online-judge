import { FC } from "react";
import { useGetUserProblemRequest } from "../hooks/useGetUserProblemRequest";

interface ProblemDescriptionTabProps {
  problemId: string;
}

export const ProblemDescriptionTab: FC<ProblemDescriptionTabProps> = ({
  problemId,
}) => {
  const { isLoading: isLoadingProblem, result: getProblemResult } =
    useGetUserProblemRequest(problemId);

  if (isLoadingProblem || !getProblemResult) {
    return <p> Loading problem... </p>;
  }

  return (
    <>
      <div
        style={{ width: "100%", backgroundColor: "#F1F1F1" }}
        dangerouslySetInnerHTML={{ __html: getProblemResult.description }}
      />
    </>
  );
};
