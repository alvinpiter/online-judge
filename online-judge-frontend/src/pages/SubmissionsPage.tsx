import { Typography } from "@mui/material";
import { FC } from "react";
import { SubmissionsPageContent } from "../modules/Submission/components/SubmissionsPageContent";
import { SubmissionsContextProvider } from "../modules/Submission/contexts/SubmissionsContext";

export const SubmissionsPage: FC = () => {
  return (
    <>
      <Typography variant="h4"> Submissions </Typography>
      <SubmissionsContextProvider>
        <SubmissionsPageContent />
      </SubmissionsContextProvider>
    </>
  );
};
