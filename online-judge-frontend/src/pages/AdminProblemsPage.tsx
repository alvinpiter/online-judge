import { Typography } from "@mui/material";
import { FC } from "react";
import { AdminProblemsPageContent } from "../modules/Problem/components/ProblemsTable/AdminProblemsPageContent";
import { AdminProblemsContextProvider } from "../modules/Problem/contexts/AdminProblemsContext";
import { SEOTitle } from "../modules/SEO/components/SEOTitle";

export const AdminProblemsPage: FC = () => {
  return (
    <>
      <SEOTitle title="Manage Problems" />
      <Typography variant="h4">Manage Problems</Typography>

      <AdminProblemsContextProvider>
        <AdminProblemsPageContent />
      </AdminProblemsContextProvider>
    </>
  );
};
