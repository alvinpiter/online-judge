import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../constants/Routes";
import { AdminProblemsPageContent } from "../modules/Problem/Read/components/AdminProblemsPageContent";
import { AdminProblemsContextProvider } from "../modules/Problem/Read/contexts/AdminProblemsContext";

export const AdminProblemsPage: FC = () => {
  return (
    <>
      <Typography variant="h4">Admin Problems</Typography>
      <Button
        variant="contained"
        href={ROUTES.NEW_PROBLEM_ROUTE.generatePath()}
      >
        New Problem
      </Button>
      <AdminProblemsContextProvider>
        <AdminProblemsPageContent />
      </AdminProblemsContextProvider>
    </>
  );
};
