import { Box, Pagination, Paper } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { LoadingState } from "../../../lib/components/LoadingState";
import { useUserProblemsContext } from "../contexts/UserProblemsContext/context";
import { ProblemsFilterForm } from "./ProblemsTable/ProblemsFilterForm";
import { UserProblemsTable } from "./ProblemsTable/UserProblemsTable";

// TODO: Refactor. Similar with AdminProblemsPageContet
export const UserProblemsPageContent: FC = () => {
  const {
    isLoadingEntities: isLoadingProblems,
    entities: problems,
    currentPage,
    filter,
    order,
    numberOfPages,
    handlePageChange,
    handleFilterChange,
    handleOrderChange,
  } = useUserProblemsContext();

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    newPage: number
  ) => {
    handlePageChange(newPage);
  };

  return (
    <Box sx={{ display: "flex", mt: 2, mb: 4 }}>
      <Box sx={{ flex: 9 }}>
        {isLoadingProblems ? (
          <LoadingState />
        ) : (
          <>
            <Paper elevation={2}>
              <UserProblemsTable
                problems={problems}
                order={order}
                onOrderChange={handleOrderChange}
              />
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
            initialFilter={filter}
            onSubmit={handleFilterChange}
          />
        </Paper>
      </Box>
    </Box>
  );
};
