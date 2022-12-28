import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from "../../../interfaces";
import { useEditSolutionTemplatesContext } from "../contexts/EditSolutionTemplatesContext/context";
import { UpsertSolutionTemplateForm } from "./UpsertSolutionTemplateForm";

export const EditSolutionTemplatesTabContent = () => {
  const {
    activeProgrammingLanguage,
    activeTemplate,
    setActiveProgrammingLanguage,
    upsertTemplate,
  } = useEditSolutionTemplatesContext();

  const handleProgrammingLanguageChange = (event: SelectChangeEvent) => {
    setActiveProgrammingLanguage(event.target.value as ProgrammingLanguage);
  };

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
      <UpsertSolutionTemplateForm
        programmingLanguage={activeProgrammingLanguage}
        initialTemplate={activeTemplate}
        onSubmit={upsertTemplate}
      />
    </>
  );
};
