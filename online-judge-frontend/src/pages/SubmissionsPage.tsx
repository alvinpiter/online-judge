import { Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { useCurrentQueryString } from "../lib/general/useCurrentQueryString";
import { SubmissionsPageContent } from "../modules/Submission/components/SubmissionsPageContent";
import { SubmissionsContextProvider } from "../modules/Submission/contexts/SubmissionsContext";
import { SubmissionsPageQueryStringObjectBuilder } from "../modules/Submission/helpers/SubmissionsPageQueryStringObjectBuilder";

export const SubmissionsPage: FC = () => {
  const navigate = useNavigate();

  const currentQueryString = useCurrentQueryString();
  const qsObjectBuilder = new SubmissionsPageQueryStringObjectBuilder(
    currentQueryString
  );

  return (
    <>
      <Typography variant="h4"> Submissions </Typography>
      <SubmissionsContextProvider
        qsObjectBuilder={qsObjectBuilder}
        onQsObjectChange={(qsObject) =>
          navigate(ROUTES.SUBMISSIONS_ROUTE.generatePath({}, qsObject))
        }
      >
        <SubmissionsPageContent />
      </SubmissionsContextProvider>
    </>
  );
};
