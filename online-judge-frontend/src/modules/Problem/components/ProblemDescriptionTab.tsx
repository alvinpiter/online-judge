import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useState } from "react";
import { useGetUserProblemRequest } from "../hooks/useGetUserProblemRequest";
import { useGetUserSolutionTemplatesRequest } from "../hooks/useGetUserSolutionTemplatesRequest";
import { useSolutionTemplatesMap } from "../hooks/useSolutionTemplatesMap";
import {
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from "../interfaces";
import { SolutionTemplateForm } from "./EditSolutionTemplates/SolutionTemplateForm";

interface ProblemDescriptionTabProps {
  problemId: string;
}

export const ProblemDescriptionTab: FC<ProblemDescriptionTabProps> = ({
  problemId,
}) => {
  const { isLoading: isLoadingProblem, result: getProblemResult } =
    useGetUserProblemRequest(problemId);

  if (isLoadingProblem || !getProblemResult) {
    return <p> Loading problem... </p>;
  }

  return (
    <>
      <div
        style={{ width: "100%", backgroundColor: "#F1F1F1" }}
        dangerouslySetInnerHTML={{ __html: getProblemResult.description }}
      />
      <Box sx={{ mt: 2 }}>
        <ProblemDescriptionTabCodeEditor problemId={problemId} />
      </Box>
    </>
  );
};

interface ProblemDescriptionTabCodeEditorProps {
  problemId: string;
}

export const ProblemDescriptionTabCodeEditor: FC<
  ProblemDescriptionTabCodeEditorProps
> = ({ problemId }) => {
  const [activeProgrammingLanguage, setActiveProgrammingLanguage] = useState(
    ProgrammingLanguage.JAVASCRIPT
  );

  const { solutionTemplatesMap } = useSolutionTemplatesMap(
    problemId,
    useGetUserSolutionTemplatesRequest
  );

  const activeSolutionTemplate =
    solutionTemplatesMap.get(activeProgrammingLanguage) || "";

  const handleProgrammingLanguageChange = (event: SelectChangeEvent) => {
    setActiveProgrammingLanguage(event.target.value as ProgrammingLanguage);
  };

  const handleSubmit = (
    programmingLanguage: ProgrammingLanguage,
    code: string
  ) => {
    console.log(programmingLanguage);
    console.log(code);
  };

  // TODO: This is quite similar with EditSolutionTemplatesTabContent
  return (
    <>
      <Select
        label="Programming Language"
        value={activeProgrammingLanguage}
        onChange={handleProgrammingLanguageChange}
      >
        {SupportedProgrammingLanguages.map((language, idx) => (
          <MenuItem key={idx} value={language}>
            {language}
          </MenuItem>
        ))}
      </Select>
      <SolutionTemplateForm
        programmingLanguage={activeProgrammingLanguage}
        initialTemplate={activeSolutionTemplate}
        onSubmit={handleSubmit}
      />
    </>
  );
};
