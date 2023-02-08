import { Box, Button, Pagination, Paper, Typography } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useUserProblemsContext } from "../contexts/UserProblemsContext/context";
import { ProblemsOrderOption } from "../interfaces";
import { ProblemsFilterForm } from "./ProblemsTable/ProblemsFilterForm";
import { UserProblemsTable } from "./ProblemsTable/UserProblemsTable";

// TODO: Refactor. Similar with AdminProblemsPageContet
export const UserProblemsPageContent: FC = () => {
  const {
    entities: problems,
    currentPage,
    filter,
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
      <Box sx={{ flexGrow: 2 }}>
        <Paper elevation={2}>
          <UserProblemsTable problems={problems} />
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
      </Box>

      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Paper elevation={2}>
          <ProblemsFilterForm
            initialFilter={filter}
            onSubmit={handleFilterChange}
          />
        </Paper>
      </Box>

      <Box sx={{ display: "none" }}>
        <Typography variant="body1"> Order by </Typography>
        {Object.keys(ProblemsOrderOption).map((order) => (
          <Button
            variant="contained"
            onClick={() => handleOrderChange(order as ProblemsOrderOption)}
            sx={{ mr: 2 }}
          >
            {order}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
