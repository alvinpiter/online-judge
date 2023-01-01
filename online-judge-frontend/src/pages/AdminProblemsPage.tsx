import { Button, Typography } from "@mui/material";
import { parse } from "qs";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { ProblemState } from "../modules/Problem/interfaces";
import { AdminProblemsPageContent } from "../modules/Problem/Read/components/AdminProblemsPageContent";
import { AdminProblemsContextProvider } from "../modules/Problem/Read/contexts/AdminProblemsContext";
import { AdminProblemsFilter } from "../modules/Problem/Read/interfaces";

export const AdminProblemsPage: FC = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const currentQueryStringAsObj = parse(currentLocation.search.slice(1)); // slice(1) to exclude the ?
  const page = currentQueryStringAsObj["page"]
    ? parseInt(currentQueryStringAsObj["page"] as string)
    : undefined;
  const filter = {
    state: currentQueryStringAsObj["state"] as ProblemState,
  };

  const handlePageChange = (newPage: number) => {
    const newQueryStringAsObj = { ...currentQueryStringAsObj, page: newPage };
    navigate(ROUTES.ADMIN_PROBLEMS_ROUTE.generatePath({}, newQueryStringAsObj)); // TODO: the second parameter is not type-safe. Please check.
  };

  const handleFilterChange = (newFilter: AdminProblemsFilter) => {
    const newQueryStringAsObj = { ...newFilter, page: 1 };
    navigate(ROUTES.ADMIN_PROBLEMS_ROUTE.generatePath({}, newQueryStringAsObj));
  };

  return (
    <>
      <Typography variant="h4">Admin Problems</Typography>
      <Button
        variant="contained"
        href={ROUTES.NEW_PROBLEM_ROUTE.generatePath()}
      >
        New Problem
      </Button>
      <AdminProblemsContextProvider
        page={page}
        filter={filter}
        handlePageChange={handlePageChange}
        handleFilterChange={handleFilterChange}
      >
        <AdminProblemsPageContent />
      </AdminProblemsContextProvider>
    </>
  );
};
