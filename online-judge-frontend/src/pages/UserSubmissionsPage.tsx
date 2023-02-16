import { Link, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { LoadingState } from "../lib/components/LoadingState";
import { useCurrentQueryString } from "../lib/general/useCurrentQueryString";
import { SEOTitle } from "../modules/SEO/components/SEOTitle";
import { SubmissionsPageContent } from "../modules/Submission/components/SubmissionsPageContent";
import { SubmissionsContextProvider } from "../modules/Submission/contexts/SubmissionsContext";
import { UserSubmissionsPageQueryStringObjectBuilder } from "../modules/Submission/helpers/UserSubmissionsPageQueryStringObjectBuilder";
import { useGetUserRequest } from "../modules/User/hooks/useGetUserRequest";

export const UserSubmissionsPage: FC = () => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId!;

  const navigate = useNavigate();

  const currentQueryString = useCurrentQueryString();
  const qsObjectBuilder = new UserSubmissionsPageQueryStringObjectBuilder(
    currentQueryString,
    userId
  );

  const { isLoading: isLoadingUser, result: user } = useGetUserRequest(
    parseInt(userId)
  );

  if (isLoadingUser) {
    return <LoadingState />;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <SEOTitle title={`${user.username}'s submissions`} />
      <Typography variant="h5">
        <Link
          href={ROUTES.USER_PROFILE_ROUTE.generatePath({
            userId,
          })}
        >
          {user.username}
        </Link>
        's submissions
      </Typography>
      <SubmissionsContextProvider
        qsObjectBuilder={qsObjectBuilder}
        onQsObjectChange={(qsObject) =>
          navigate(
            ROUTES.USER_SUBMISSIONS_ROUTE.generatePath({ userId }, qsObject)
          )
        }
      >
        <SubmissionsPageContent hideUserFilter />
      </SubmissionsContextProvider>
    </>
  );
};
