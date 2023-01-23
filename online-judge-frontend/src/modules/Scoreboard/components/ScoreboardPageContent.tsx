import { FC } from "react";
import { useScoreboardContext } from "../contexts/ScoreboardContext/context";
import { useScoreboardRowsPaginationContext } from "../contexts/ScoreboardRowsPaginationContext/context";
import { ScoreboardTable } from "./ScoreboardTable";

export const ScoreboardPageContent: FC = () => {
  const { problems } = useScoreboardContext();
  const { entities: scoreboardRows } = useScoreboardRowsPaginationContext();

  return (
    <>
      <ScoreboardTable problems={problems} rows={scoreboardRows} />
    </>
  );
};
