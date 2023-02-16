import { Box, Pagination, Paper } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { LoadingState } from "../../../lib/components/LoadingState";
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
    isLoadingEntities: isLoadingScoreboardRows,
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
      <Box sx={{ mt: 2, mb: 2, width: "33%" }}>
        <Paper elevation={2} sx={{ padding: 2 }}>
          <ScoreboardFilterForm
            initialFilter={filter}
            onSubmit={handleFilterChange}
          />
        </Paper>
      </Box>

      {isLoadingScoreboardRows ? (
        <LoadingState />
      ) : (
        <Box>
          <ScoreboardTable problems={problems} rows={scoreboardRows} />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Pagination
              page={currentPage}
              count={numberOfPages}
              onChange={handlePaginationChange}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
