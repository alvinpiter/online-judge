import { Link, Typography } from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../constants/Routes";
import { useCurrentUserRequest } from "../modules/User/hooks/useCurrentUserRequest";

export const UserProfilePage: FC = () => {
  const { isLoading, result } = useCurrentUserRequest();

  if (isLoading || !result) {
    return <p> Loading user... </p>;
  }

  return (
    <>
      <Typography variant="h5"> {result.username}'s profile </Typography>
      <Link
        href={ROUTES.USER_SUBMISSIONS_ROUTE.generatePath({
          userId: result.id.toString(),
        })}
      >
        Submissions
      </Link>
    </>
  );
};
