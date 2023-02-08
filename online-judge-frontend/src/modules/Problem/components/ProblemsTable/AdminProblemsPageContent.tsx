import { Box, Button, Pagination, Paper, Typography } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useAdminProblemsContext } from "../../contexts/AdminProblemsContext";
import { ProblemsOrderOption } from "../../interfaces";
import { ProblemsFilterForm } from "./ProblemsFilterForm";
import { AdminProblemsTable } from "./AdminProblemsTable";
import { ROUTES } from "../../../../constants/Routes";

export const AdminProblemsPageContent: FC = () => {
  const {
    entities: problems,
    currentPage,
    filter,
    numberOfPages,
    handlePageChange,
    handleFilterChange,
    handleOrderChange,
  } = useAdminProblemsContext();

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    newPage: number
  ) => {
    handlePageChange(newPage);
  };

  return (
    <Box sx={{ display: "flex", mt: 2, mb: 4 }}>
      <Box sx={{ flexGrow: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            href={ROUTES.NEW_PROBLEM_ROUTE.generatePath()}
            color="success"
          >
            New Problem
          </Button>
        </Box>

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
      </Box>

      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Paper elevation={2}>
          <ProblemsFilterForm
            showStateField
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
