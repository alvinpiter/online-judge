import Editor from "@monaco-editor/react";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { CODE_EDITOR_PROGRAMMING_LANGUAGE_MAPPER } from "../constants/CodeEditorProgrammingLanguageMapper";
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
      <Typography variant="h4">Submission #{submissionId}</Typography>
      <SubmissionSummary submission={submissionWithDetails} />

      <Box sx={{ mt: 2 }}>
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
      </Box>

      {submissionWithDetails.compilationDetail && (
        <Box sx={{ mt: 2 }}>
          <SubmissionCompilationMessage
            compilationDetail={submissionWithDetails.compilationDetail}
          />
        </Box>
      )}

      {submissionWithDetails.runDetails.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <SubmissionRunDetailsTable
            runDetails={submissionWithDetails.runDetails}
          />
        </Box>
      )}
    </>
  );
};
