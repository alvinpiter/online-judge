import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../constants/Routes";
import { LoadingState } from "../lib/components/LoadingState";
import { SEOTitle } from "../modules/SEO/components/SEOTitle";
import { useGetGlobalStatisticsRequest } from "../modules/Statistics/hooks/useGetGlobalStatisticsRequest";

export const HomePage: FC = () => {
  const { isLoading: isLoadingGlobalStatistics, result: globalStatistics } =
    useGetGlobalStatisticsRequest();

  return (
    <>
      <SEOTitle title="Online Judge" />
      <Paper elevation={2} sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h3">Welcome to Online Judge!</Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          Features:
        </Typography>

        <Box>
          <Typography variant="body1">
            <Link href={ROUTES.USER_PROBLEMS_ROUTE.generatePath()}>
              Practice solving coding problems
            </Link>
          </Typography>
        </Box>

        <Box>
          <Typography variant="body1">
            <Link href={ROUTES.SUBMISSIONS_ROUTE.generatePath()}>
              See other users' solutions
            </Link>
          </Typography>
        </Box>

        <Box>
          <Typography variant="body1">
            <Link href={ROUTES.SCOREBOARD_ROUTE.generatePath()}>
              Compare your performance against other users
            </Link>
          </Typography>
        </Box>
      </Paper>

      {isLoadingGlobalStatistics && <LoadingState />}

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
