import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/Routes";
import { useSnackbarContext } from "../../../core/Snackbar";
import { FormattedProgrammingLanguage } from "../../Submission/components/FormattedProgrammingLanguage/FormattedProgrammingLanguage";
import { useCreateSubmissionRequest } from "../../Submission/hooks/useCreateSubmissionRequest";
import { useCurrentUserContext } from "../../User/contexts/CurrentUserContext";
import { useGetSolutionTemplatesRequest } from "../hooks/useGetSolutionTemplatesRequest";
import { useSolutionTemplatesMap } from "../hooks/useSolutionTemplatesMap";
import {
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from "../interfaces";
import { SolutionTemplateForm } from "./EditSolutionTemplates/SolutionTemplateForm";

interface SubmissionCodeEditorProps {
  problemId: string;
}

export const SubmissionCodeEditor: FC<SubmissionCodeEditorProps> = ({
  problemId,
}) => {
  const navigate = useNavigate();

  const { currentUser } = useCurrentUserContext();
  const [activeProgrammingLanguage, setActiveProgrammingLanguage] = useState(
    ProgrammingLanguage.JAVASCRIPT
  );

  const { solutionTemplatesMap } = useSolutionTemplatesMap(
    problemId,
    useGetSolutionTemplatesRequest
  );

  const {
    result: createSubmissionResult,
    error: createSubmissionError,
    requestFunction: createSubmissionRequest,
  } = useCreateSubmissionRequest();

  const { openSnackbar } = useSnackbarContext();

  const activeSolutionTemplate =
    solutionTemplatesMap.get(activeProgrammingLanguage) || "";

  const handleProgrammingLanguageChange = (event: SelectChangeEvent) => {
    setActiveProgrammingLanguage(event.target.value as ProgrammingLanguage);
  };

  const handleSubmit = (
    programmingLanguage: ProgrammingLanguage,
    code: string
  ) => {
    createSubmissionRequest({
      problemId: parseInt(problemId),
      programmingLanguage,
      code,
    });
  };

  useEffect(() => {
    if (createSubmissionResult) {
      openSnackbar("success", "Solution is submitted!");
      navigate(
        ROUTES.USER_SUBMISSIONS_ROUTE.generatePath(
          {
            userId: currentUser!.id.toString(),
          },
          {
            problemId: problemId.toString(),
          }
        )
      );
    }
  }, [createSubmissionResult, openSnackbar, navigate, currentUser, problemId]);

  useEffect(() => {
    if (createSubmissionError) {
      openSnackbar("error", createSubmissionError.message);
    }
  }, [createSubmissionError, openSnackbar]);

  // TODO: This is quite similar with EditSolutionTemplatesTabContent
  return (
    <>
      <Select
        label="Programming Language"
        value={activeProgrammingLanguage}
        onChange={handleProgrammingLanguageChange}
        size="small"
      >
        {SupportedProgrammingLanguages.map((language, idx) => (
          <MenuItem key={idx} value={language}>
            <FormattedProgrammingLanguage programmingLanguage={language} />
          </MenuItem>
        ))}
      </Select>

      <Box sx={{ mt: 1 }}>
        <SolutionTemplateForm
          programmingLanguage={activeProgrammingLanguage}
          initialTemplate={activeSolutionTemplate}
          onSubmit={handleSubmit}
        />
      </Box>
    </>
  );
};
