import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useGetSolutionTemplatesRequest } from "../../hooks/useGetSolutionTemplatesRequest";
import {
  ProblemSolutionTemplate,
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from "../../interfaces";
import { EditProblemTabBaseProps } from "./interface";
import { UpsertSolutionTemplateForm } from "./UpsertSolutionTemplateForm";

export const EditProblemSolutionTemplateTab: FC<EditProblemTabBaseProps> = ({
  isActive,
  problemId,
}) => {
  const [programmingLanguage, setProgrammingLanguage] =
    useState<ProgrammingLanguage>(ProgrammingLanguage.JAVASCRIPT);

  const [templateMap, setTemplateMap] = useState<
    Map<ProgrammingLanguage, string>
  >(new Map());

  const { result: initialSolutionTemplates } =
    useGetSolutionTemplatesRequest(problemId);

  const handleSelectFieldChange = (event: SelectChangeEvent) => {
    setProgrammingLanguage(event.target.value as ProgrammingLanguage);
  };

  const handleSuccessfulUpsert = (
    problemSolutionTemplate: ProblemSolutionTemplate
  ) => {
    setTemplateMap((prevTemplateMap) => {
      const newTemplateMap = new Map(prevTemplateMap);
      newTemplateMap.set(
        problemSolutionTemplate.programmingLanguage,
        problemSolutionTemplate.template
      );

      return newTemplateMap;
    });
  };

  useEffect(() => {
    if (initialSolutionTemplates) {
      const newTemplateMap = new Map<ProgrammingLanguage, string>();
      initialSolutionTemplates.forEach((template) =>
        newTemplateMap.set(template.programmingLanguage, template.template)
      );

      setTemplateMap(newTemplateMap);
    }
  }, [initialSolutionTemplates]);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Select
        label="Programming Language"
        value={programmingLanguage}
        onChange={handleSelectFieldChange}
      >
        {SupportedProgrammingLanguages.map((language, idx) => (
          <MenuItem key={idx} value={language}>
            {language}
          </MenuItem>
        ))}
      </Select>
      <UpsertSolutionTemplateForm
        problemId={problemId}
        programmingLanguage={programmingLanguage}
        initialTemplate={templateMap.get(programmingLanguage) || ""}
        onSuccess={handleSuccessfulUpsert}
      />
    </>
  );
};
