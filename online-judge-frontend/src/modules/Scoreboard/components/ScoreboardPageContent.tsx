import { Alert, Box, Pagination, Paper } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { config } from "../../../config";
import { LoadingState } from "../../../lib/components/LoadingState";
import { useScoreboardContext } from "../contexts/ScoreboardContext/context";
import { useScoreboardRowsPaginationContext } from "../contexts/ScoreboardRowsPaginationContext/context";
import { ScoreboardFilterForm } from "./ScoreboardFilterForm";
import { ScoreboardTable } from "./ScoreboardTable";

export const ScoreboardPageContent: FC = () => {
  const contestStartTimeInMilliseconds = config.contestStartTimeInMilliseconds;

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
          <Alert severity="info">
            {`User with more solved problems will have a better rank.
              In case of a tie, the one with smaller "last solve at" will have a better
              rank. "Last solve at" is the timestamp (in seconds) at which the user solve
              its last problem. It is calculated relative to the contest start time, ${new Date(
                contestStartTimeInMilliseconds
              )}.`}
          </Alert>

          <Box sx={{ mt: 2 }}>
            <ScoreboardTable problems={problems} rows={scoreboardRows} />
          </Box>

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
