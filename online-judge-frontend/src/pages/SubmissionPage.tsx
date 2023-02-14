import Editor from "@monaco-editor/react";
import { Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { CODE_EDITOR_PROGRAMMING_LANGUAGE_MAPPER } from "../constants/CodeEditorProgrammingLanguageMapper";
import { SEOTitle } from "../modules/SEO/components/SEOTitle";
import { SubmissionCompilationMessage } from "../modules/Submission/components/SubmissionDetail/SubmissionCompilationMessage";
import { SubmissionRunDetailsTable } from "../modules/Submission/components/SubmissionDetail/SubmissionRunDetailsTable";
import { SubmissionSummary } from "../modules/Submission/components/SubmissionDetail/SubmissionSummary";
import { useGetSubmissionWithDetailsRequest } from "../modules/Submission/hooks/useGetSubmissionWithDetailsRequest";

export const SubmissionPage: FC = () => {
  const params = useParams<{ submissionId: string }>();
  const submissionId = params.submissionId!;

  const { isLoading: isLoadingSubmission, result: submissionWithDetails } =
    useGetSubmissionWithDetailsRequest(parseInt(submissionId));

  if (isLoadingSubmission || !submissionWithDetails) {
    return <p> Loading submission </p>;
  }

  return (
    <>
      <SEOTitle title={`Submission #${submissionId}`} />
      <Typography variant="h4">Submission #{submissionId}</Typography>

      <Stack direction="column" sx={{ mt: 2 }} spacing={2}>
        <Paper elevation={2} sx={{ padding: 2 }}>
          <Typography variant="h6"> Summary </Typography>
          <SubmissionSummary submission={submissionWithDetails} />
        </Paper>

        <Paper elevation={2} sx={{ padding: 2 }}>
          <Typography variant="h6"> Code </Typography>
          <Editor
            height="20vh"
            theme="vs-dark"
            defaultLanguage={CODE_EDITOR_PROGRAMMING_LANGUAGE_MAPPER.get(
              submissionWithDetails.programmingLanguage
            )}
            value={submissionWithDetails.code}
            options={{
              minimap: {
                enabled: false,
              },
            }}
          />
        </Paper>

        {submissionWithDetails.compilationDetail && (
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Typography variant="h6"> Compilation Detail </Typography>
            <SubmissionCompilationMessage
              compilationDetail={submissionWithDetails.compilationDetail}
            />
          </Paper>
        )}

        {submissionWithDetails.runDetails.length > 0 && (
          <Paper elevation={2} sx={{ padding: 2 }}>
            <Typography variant="h6"> Details </Typography>
            <SubmissionRunDetailsTable
              runDetails={submissionWithDetails.runDetails}
            />
          </Paper>
        )}
      </Stack>
    </>
  );
};
