import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router";
import { UserStatisticsTable } from "../modules/Statistics/components/UserStatisticsTable";
import { useGetUserRequest } from "../modules/User/hooks/useGetUserRequest";

export const UserProfilePage: FC = () => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId!;

  const { isLoading, result } = useGetUserRequest(parseInt(userId));

  if (isLoading || !result) {
    return <p> Loading user... </p>;
  }

  return (
    <>
      <Typography variant="h4"> {result.username}'s profile </Typography>

      <Box sx={{ mt: 2 }}>
        <UserStatisticsTable userId={parseInt(userId)} />
      </Box>
    </>
  );
};
