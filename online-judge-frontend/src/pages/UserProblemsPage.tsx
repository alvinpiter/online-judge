import { Typography } from "@mui/material";
import { FC } from "react";
import { UserProblemsPageContent } from "../modules/Problem/components/UserProblemsPageContent";
import { UserProblemsContextProvider } from "../modules/Problem/contexts/UserProblemsContext";

export const UserProblemsPage: FC = () => {
  return (
    <>
      <Typography variant="h4"> Problems</Typography>
      <UserProblemsContextProvider>
        <UserProblemsPageContent />
      </UserProblemsContextProvider>
    </>
  );
};
