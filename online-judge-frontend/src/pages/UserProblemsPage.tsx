import { Typography } from "@mui/material";
import { FC } from "react";
import { UserProblemsPageContent } from "../modules/Problem/components/UserProblemsPageContent";
import { UserProblemsContextProvider } from "../modules/Problem/contexts/UserProblemsContext";
import { SEOTitle } from "../modules/SEO/components/SEOTitle";

export const UserProblemsPage: FC = () => {
  return (
    <>
      <SEOTitle title="Problems" />
      <Typography variant="h4"> Problems</Typography>
      <UserProblemsContextProvider>
        <UserProblemsPageContent />
      </UserProblemsContextProvider>
    </>
  );
};
