import { Link, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../constants/Routes";
import { useGetGlobalStatisticsRequest } from "../modules/Statistics/hooks/useGetGlobalStatisticsRequest";

export const HomePage: FC = () => {
  const { result: globalStatistics } = useGetGlobalStatisticsRequest();

  return (
    <>
      <Paper elevation={2} sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h3">Welcome to Online Judge!</Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          {" "}
          Features:{" "}
        </Typography>

        <Link href={ROUTES.USER_PROBLEMS_ROUTE.generatePath()}>
          <Typography variant="body1">
            Practice solving coding problems
          </Typography>
        </Link>

        <Link href={ROUTES.SUBMISSIONS_ROUTE.generatePath()}>
          <Typography variant="body1"> See other users' solutions </Typography>
        </Link>

        <Link href={ROUTES.SCOREBOARD_ROUTE.generatePath()}>
          <Typography variant="body1">
            Compare your performance against other users
          </Typography>
        </Link>
      </Paper>

      {globalStatistics && (
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Paper elevation={2} sx={{ padding: 2, flex: 1 }}>
            <Typography variant="h5">Number of users</Typography>
            <Typography variant="h4" sx={{ mt: 2 }}>
              {globalStatistics.numberOfUsers}
            </Typography>
            <Typography variant="caption" sx={{ mt: 1 }} color="text.secondary">
              Updated every 1 minute
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ padding: 2, flex: 1 }}>
            <Typography variant="h5"> Number of problems </Typography>
            <Typography variant="h4" sx={{ mt: 2 }}>
              {globalStatistics.numberOfProblems}
            </Typography>
            <Typography variant="caption" sx={{ mt: 1 }} color="text.secondary">
              Updated every 1 minute
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ padding: 2, flex: 1 }}>
            <Typography variant="h5"> Number of submissions </Typography>
            <Typography variant="h4" sx={{ mt: 2 }}>
              {globalStatistics.numberOfSubmissions}
            </Typography>
            <Typography variant="caption" sx={{ mt: 1 }} color="text.secondary">
              Updated every 1 minute
            </Typography>
          </Paper>
        </Stack>
      )}
    </>
  );
};
