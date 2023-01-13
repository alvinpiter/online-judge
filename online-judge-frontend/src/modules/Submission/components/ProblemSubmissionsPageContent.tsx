import { Pagination } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { useSubmissionsContext } from "../contexts/SubmissionsContext/context";
import { SubmissionsFilterForm } from "./SubmissionsTable/SubmissionsFilterForm";
import { SubmissionsTable } from "./SubmissionsTable/SubmissionsTable";

// TODO: Almost similar with SubmissionsPageContent
export const ProblemSubmissionsPageContent: FC = () => {
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
    <>
      <SubmissionsFilterForm
        initialFilter={filter}
        onSubmit={handleFilterChange}
        hideProblemFilter
      />

      <SubmissionsTable submissions={submissions} />

      <Pagination
        page={currentPage}
        count={numberOfPages}
        onChange={handlePaginationChange}
      />
    </>
  );
};
