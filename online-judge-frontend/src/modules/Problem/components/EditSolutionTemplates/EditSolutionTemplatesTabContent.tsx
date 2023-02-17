import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FormattedProgrammingLanguage } from "../../../Submission/components/FormattedProgrammingLanguage/FormattedProgrammingLanguage";
import { useEditSolutionTemplatesContext } from "../../contexts/EditSolutionTemplatesContext/context";
import {
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from "../../interfaces";
import { SolutionTemplateForm } from "./SolutionTemplateForm";

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
    <Box sx={{ mt: 2 }}>
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
          initialTemplate={activeTemplate}
          onSubmit={upsertTemplate}
        />
      </Box>
    </Box>
  );
};
