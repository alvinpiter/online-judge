import { Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useGetGlobalStatisticsRequest } from "../modules/Statistics/hooks/useGetGlobalStatisticsRequest";

export const HomePage: FC = () => {
  const { result: globalStatistics } = useGetGlobalStatisticsRequest();

  return (
    <>
      {globalStatistics && (
        <Stack direction="row" spacing={2}>
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
