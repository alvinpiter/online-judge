import { Pagination } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useAdminProblemsContext } from "../contexts/AdminProblemsContext";
import { AdminProblemsFilterForm } from "./AdminProblemsFilterForm";
import { AdminProblemsTable } from "./AdminProblemsTable";

export const AdminProblemsPageContent: FC = () => {
  const {
    problems,
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
    <>
      <AdminProblemsFilterForm
        initialFilter={filter}
        onSubmit={handleFilterChange}
      />
      <AdminProblemsTable problems={problems} />
      <Pagination
        page={currentPage}
        count={numberOfPages}
        onChange={handlePaginationChange}
      />
    </>
  );
};
