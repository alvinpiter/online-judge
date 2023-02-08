import { Typography } from "@mui/material";
import { FC } from "react";
import { AdminProblemsPageContent } from "../modules/Problem/components/ProblemsTable/AdminProblemsPageContent";
import { AdminProblemsContextProvider } from "../modules/Problem/contexts/AdminProblemsContext";

export const AdminProblemsPage: FC = () => {
  return (
    <>
      <Typography variant="h4">Admin Problems</Typography>

      <AdminProblemsContextProvider>
        <AdminProblemsPageContent />
      </AdminProblemsContextProvider>
    </>
  );
};
