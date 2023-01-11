import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useState } from "react";
import { useGetSolutionTemplatesRequest } from "../../hooks/useGetSolutionTemplatesRequest";
import { useSolutionTemplatesMap } from "../../hooks/useSolutionTemplatesMap";
import {
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from "../../interfaces";
import { SolutionTemplateForm } from "../EditSolutionTemplates/SolutionTemplateForm";

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
    useGetSolutionTemplatesRequest
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
