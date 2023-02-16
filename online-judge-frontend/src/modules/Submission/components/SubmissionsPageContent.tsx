import { Box, Pagination, Paper } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { LoadingState } from "../../../lib/components/LoadingState";
import { useSubmissionsContext } from "../contexts/SubmissionsContext/context";
import { SubmissionsFilterForm } from "./SubmissionFilterForm/SubmissionsFilterForm";
import { SubmissionsTable } from "./SubmissionsTable/SubmissionsTable";

export const SubmissionsPageContent: FC = () => {
  const {
    isLoadingEntities: isLoadingSubmissions,
    entities: submissions,
    currentPage,
    filter,
    numberOfPages,
    handlePageChange,
    handleFilterChange,
  } = useSubmissionsContext();

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    newPage: number
  ) => {
    handlePageChange(newPage);
  };

  return (
    <Box sx={{ display: "flex", mt: 2, mb: 4 }}>
      <Box sx={{ flex: 9 }}>
        {isLoadingSubmissions ? (
          <LoadingState />
        ) : (
          <>
            <Paper elevation={2}>
              <SubmissionsTable submissions={submissions} />
            </Paper>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 1,
              }}
            >
              <Pagination
                page={currentPage}
                count={numberOfPages}
                onChange={handlePaginationChange}
              />
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ flex: 3, ml: 2 }}>
        <Paper elevation={2} sx={{ padding: 2 }}>
          <SubmissionsFilterForm
            initialFilter={filter}
            onSubmit={handleFilterChange}
          />
        </Paper>
      </Box>
    </Box>
  );
};
