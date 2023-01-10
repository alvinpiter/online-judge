import { Box, Button, Pagination, Typography } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useAdminProblemsContext } from "../../contexts/AdminProblemsContext";
import { AdminProblemsOrderOption } from "../../interfaces";
import { AdminProblemsFilterForm } from "./AdminProblemsFilterForm";
import { AdminProblemsTable } from "./AdminProblemsTable";

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
    <>
      <AdminProblemsFilterForm
        initialFilter={filter}
        onSubmit={handleFilterChange}
      />
      <Box>
        <Typography variant="body1"> Order by </Typography>
        {Object.keys(AdminProblemsOrderOption).map((order) => (
          <Button
            variant="contained"
            onClick={() => handleOrderChange(order as AdminProblemsOrderOption)}
            sx={{ mr: 2 }}
          >
            {order}
          </Button>
        ))}
      </Box>
      <AdminProblemsTable problems={problems} />
      <Pagination
        page={currentPage}
        count={numberOfPages}
        onChange={handlePaginationChange}
      />
    </>
  );
};
