import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { SubmissionCodeEditor } from "../modules/Problem/components/SubmissionCodeEditor";
import { useGetProblemRequest } from "../modules/Problem/hooks/useGetProblemRequest";

export const UserProblemPage: FC = () => {
  const params = useParams<{ problemId: string }>();
  const problemId = params.problemId!;

  const { isLoading: isLoadingProblem, result: problem } =
    useGetProblemRequest(problemId);

  if (isLoadingProblem || !problem) {
    return <p> Loading problem... </p>;
  }

  return (
    <>
      <Typography variant="h4">Problem: {problem.name}</Typography>

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
