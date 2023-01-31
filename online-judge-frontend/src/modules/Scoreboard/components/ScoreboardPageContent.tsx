import { Pagination } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useScoreboardContext } from "../contexts/ScoreboardContext/context";
import { useScoreboardRowsPaginationContext } from "../contexts/ScoreboardRowsPaginationContext/context";
import { ScoreboardTable } from "./ScoreboardTable";

export const ScoreboardPageContent: FC = () => {
  const { problems } = useScoreboardContext();
  const {
    currentPage,
    numberOfPages,
    handlePageChange,
    entities: scoreboardRows,
  } = useScoreboardRowsPaginationContext();

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    newPage: number
  ) => {
    handlePageChange(newPage);
  };

  return (
    <>
      <ScoreboardTable problems={problems} rows={scoreboardRows} />
      <Pagination
        page={currentPage}
        count={numberOfPages}
        onChange={handlePaginationChange}
      />
    </>
  );
};
