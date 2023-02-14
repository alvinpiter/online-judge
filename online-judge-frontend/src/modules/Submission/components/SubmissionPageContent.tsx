import Editor from "@monaco-editor/react";
import { Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { CODE_EDITOR_PROGRAMMING_LANGUAGE_MAPPER } from "../../../constants/CodeEditorProgrammingLanguageMapper";
import { SubmissionWithDetails } from "../interfaces";
import { SubmissionCompilationMessage } from "./SubmissionDetail/SubmissionCompilationMessage";
import { SubmissionRunDetailsTable } from "./SubmissionDetail/SubmissionRunDetailsTable";
import { SubmissionSummary } from "./SubmissionDetail/SubmissionSummary";

interface SubmissionPageContentProps {
  submissionWithDetails: SubmissionWithDetails;
}

export const SubmissionPageContent: FC<SubmissionPageContentProps> = ({
  submissionWithDetails,
}) => {
  return (
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
  );
};
