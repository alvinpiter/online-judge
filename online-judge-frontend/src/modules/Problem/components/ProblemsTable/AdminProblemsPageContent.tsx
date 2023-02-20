import { Box, Button, Pagination, Paper } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useAdminProblemsContext } from "../../contexts/AdminProblemsContext";
import { ProblemsFilterForm } from "./ProblemsFilterForm";
import { AdminProblemsTable } from "./AdminProblemsTable";
import { ROUTES } from "../../../../constants/Routes";
import { LoadingState } from "../../../../lib/components/LoadingState";

export const AdminProblemsPageContent: FC = () => {
  const {
    isLoadingEntities: isLoadingProblems,
    entities: problems,
    currentPage,
    filter,
    numberOfPages,
    handlePageChange,
    handleFilterChange,
  } = useAdminProblemsContext();

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    newPage: number
  ) => {
    handlePageChange(newPage);
  };

  return (
    <Box sx={{ display: "flex", mt: 2, mb: 4 }}>
      <Box sx={{ flex: 9 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            href={ROUTES.NEW_PROBLEM_ROUTE.generatePath()}
            color="success"
          >
            New Problem
          </Button>
        </Box>

        {isLoadingProblems ? (
          <LoadingState />
        ) : (
          <>
            <Paper elevation={2} sx={{ mt: 2 }}>
              <AdminProblemsTable problems={problems} />
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
        <Paper elevation={2}>
          <ProblemsFilterForm
            showStateField
            initialFilter={filter}
            onSubmit={handleFilterChange}
          />
        </Paper>
      </Box>
    </Box>
  );
};
