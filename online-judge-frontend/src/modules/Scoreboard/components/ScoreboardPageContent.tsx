import { Pagination } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useScoreboardContext } from "../contexts/ScoreboardContext/context";
import { useScoreboardRowsPaginationContext } from "../contexts/ScoreboardRowsPaginationContext/context";
import { ScoreboardFilterForm } from "./ScoreboardFilterForm";
import { ScoreboardTable } from "./ScoreboardTable";

export const ScoreboardPageContent: FC = () => {
  const { problems } = useScoreboardContext();
  const {
    currentPage,
    numberOfPages,
    handlePageChange,
    entities: scoreboardRows,
    filter,
    handleFilterChange,
  } = useScoreboardRowsPaginationContext();

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    newPage: number
  ) => {
    handlePageChange(newPage);
  };

  return (
    <>
      <ScoreboardFilterForm
        initialFilter={filter}
        onSubmit={handleFilterChange}
      />

      <ScoreboardTable problems={problems} rows={scoreboardRows} />
      <Pagination
        page={currentPage}
        count={numberOfPages}
        onChange={handlePaginationChange}
      />
    </>
  );
};
