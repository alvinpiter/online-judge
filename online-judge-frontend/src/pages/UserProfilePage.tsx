import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { UserStatisticsTable } from "../modules/Statistics/components/UserStatisticsTable";
import { useCurrentUserRequest } from "../modules/User/hooks/useCurrentUserRequest";

export const UserProfilePage: FC = () => {
  const { isLoading, result } = useCurrentUserRequest();

  if (isLoading || !result) {
    return <p> Loading user... </p>;
  }

  return (
    <>
      <Typography variant="h4"> {result.username}'s profile </Typography>

      <Box sx={{ mt: 2 }}>
        <UserStatisticsTable userId={1} />
      </Box>
    </>
  );
};
