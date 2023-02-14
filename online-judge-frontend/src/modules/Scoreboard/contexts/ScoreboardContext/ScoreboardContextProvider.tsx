import { FC, ReactNode } from "react";
import { LoadingState } from "../../../../lib/components/LoadingState";
import { useGetScoreboardProblemsRequest } from "../../hooks/useGetScoreboardProblemsRequest";
import { ScoreboardRowsPaginationContextProvider } from "../ScoreboardRowsPaginationContext";
import { ScoreboardContext } from "./context";

interface ScoreboardContextProviderProps {
  children?: ReactNode;
}

export const ScoreboardContextProvider: FC<ScoreboardContextProviderProps> = ({
  children,
}) => {
  const { isLoading: isLoadingScoreboardProblems, result: problems } =
    useGetScoreboardProblemsRequest();

  if (isLoadingScoreboardProblems) {
    return <LoadingState />;
  }

  if (!problems) {
    return null;
  }

  return (
    <ScoreboardContext.Provider value={{ problems }}>
      <ScoreboardRowsPaginationContextProvider>
        {children}
      </ScoreboardRowsPaginationContextProvider>
    </ScoreboardContext.Provider>
  );
};
