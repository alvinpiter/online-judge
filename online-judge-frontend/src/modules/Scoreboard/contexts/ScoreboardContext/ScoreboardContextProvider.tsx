import { FC, ReactNode } from "react";
import { useGetScoreboardProblemsRequest } from "../../hooks/useGetScoreboardProblemsRequest";
import { ScoreboardRowsPaginationContextProvider } from "../ScoreboardRowsPaginationContext";
import { ScoreboardContext } from "./context";

interface ScoreboardContextProviderProps {
  children?: ReactNode;
}

export const ScoreboardContextProvider: FC<ScoreboardContextProviderProps> = ({
  children,
}) => {
  const { isLoading, result: problems } = useGetScoreboardProblemsRequest();

  if (isLoading || !problems) {
    return <p> Loading scoreboard... </p>;
  }

  return (
    <ScoreboardContext.Provider value={{ problems }}>
      <ScoreboardRowsPaginationContextProvider>
        {children}
      </ScoreboardRowsPaginationContextProvider>
    </ScoreboardContext.Provider>
  );
};
