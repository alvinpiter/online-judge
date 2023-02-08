import { Box, Pagination, Paper } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useSubmissionsContext } from "../contexts/SubmissionsContext/context";
import { SubmissionsFilterForm } from "./SubmissionsTable/SubmissionsFilterForm";
import { SubmissionsTable } from "./SubmissionsTable/SubmissionsTable";

export const SubmissionsPageContent: FC = () => {
  const {
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
    <Box sx={{ display: "flex", mt: 2 }}>
      <Box sx={{ flexGrow: 2 }}>
        <Paper elevation={2}>
          <SubmissionsTable submissions={submissions} />
        </Paper>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            page={currentPage}
            count={numberOfPages}
            onChange={handlePaginationChange}
          />
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Paper elevation={2}>
          <SubmissionsFilterForm
            initialFilter={filter}
            onSubmit={handleFilterChange}
          />
        </Paper>
      </Box>
    </Box>
  );
};
