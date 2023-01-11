import { Box, Button, Pagination, Typography } from "@mui/material";
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
    <>
      <ProblemsFilterForm
        initialFilter={filter}
        onSubmit={handleFilterChange}
      />
      <Box>
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
      <UserProblemsTable problems={problems} />
      <Pagination
        page={currentPage}
        count={numberOfPages}
        onChange={handlePaginationChange}
      />
    </>
  );
};
