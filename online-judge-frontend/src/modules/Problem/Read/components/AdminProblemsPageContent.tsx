import { Pagination } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useAdminProblemsContext } from "../contexts/AdminProblemsContext";
import { AdminProblemsTable } from "./AdminProblemsTable";

export const AdminProblemsPageContent: FC = () => {
  const { problems, currentPage, numberOfPages, handlePageChange } =
    useAdminProblemsContext();

  const handlePaginationChange = (
    event: ChangeEvent<unknown>,
    newPage: number
  ) => {
    handlePageChange(newPage);
  };

  return (
    <>
      <AdminProblemsTable problems={problems} />
      <Pagination
        page={currentPage}
        count={numberOfPages}
        onChange={handlePaginationChange}
      />
    </>
  );
};
