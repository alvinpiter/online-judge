import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { LoadingState } from "../lib/components/LoadingState";
import { SubmissionCodeEditor } from "../modules/Problem/components/SubmissionCodeEditor";
import { useGetProblemRequest } from "../modules/Problem/hooks/useGetProblemRequest";
import { SEOTitle } from "../modules/SEO/components/SEOTitle";

export const UserProblemPage: FC = () => {
  const params = useParams<{ problemId: string }>();
  const problemId = params.problemId!;

  const { isLoading: isLoadingProblem, result: problem } =
    useGetProblemRequest(problemId);

  if (isLoadingProblem) {
    return <LoadingState />;
  }

  if (!problem) {
    return null;
  }

  return (
    <>
      <SEOTitle title={problem.name} />
      <Typography variant="h4">{problem.name}</Typography>

      <Stack direction="column">
        <Typography variant="subtitle1"> Time limit: 1s </Typography>
        <Typography variant="subtitle1"> Memory limit: 512MB </Typography>
        <Typography variant="subtitle1">
          <Link
            href={ROUTES.PROBLEM_SUBMISSIONS_ROUTE.generatePath({
              problemId,
            })}
          >
            Submissions
          </Link>
        </Typography>
      </Stack>

      <Box sx={{ display: "flex", mt: 2 }}>
        <Box sx={{ flex: 1, flexGrow: 1 }}>
          <Paper elevation={2} sx={{ padding: 2 }}>
            <div
              style={{
                backgroundColor: "#F1F1F1",
                padding: 8,
              }}
              dangerouslySetInnerHTML={{ __html: problem.description }}
            />
          </Paper>
        </Box>

        <Box sx={{ flex: 1, flexGrow: 1, ml: 2 }}>
          <Paper elevation={2} sx={{ padding: 2 }}>
            <SubmissionCodeEditor problemId={problemId} />
          </Paper>
        </Box>
      </Box>
    </>
  );
};
