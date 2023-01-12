import { Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { useCurrentQueryString } from "../lib/general/useCurrentQueryString";
import { UserSubmissionsPageContent } from "../modules/Submission/components/UserSubmissionsPageContent";
import { SubmissionsContextProvider } from "../modules/Submission/contexts/SubmissionsContext";
import { UserSubmissionsPageQueryStringObjectBuilder } from "../modules/Submission/helpers/UserSubmissionsPageQueryStringObjectBuilder";

export const UserSubmissionsPage: FC = () => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId!;

  const navigate = useNavigate();

  const currentQueryString = useCurrentQueryString();
  const qsObjectBuilder = new UserSubmissionsPageQueryStringObjectBuilder(
    currentQueryString,
    userId
  );

  return (
    <>
      <Typography variant="h5"> User's submissions </Typography>
      <SubmissionsContextProvider
        qsObjectBuilder={qsObjectBuilder}
        onQsObjectChange={(qsObject) =>
          navigate(
            ROUTES.USER_SUBMISSIONS_ROUTE.generatePath({ userId }, qsObject)
          )
        }
      >
        <UserSubmissionsPageContent />
      </SubmissionsContextProvider>
    </>
  );
};
