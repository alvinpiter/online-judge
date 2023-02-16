import { TextField } from "@mui/material";
import { FC } from "react";
import { AutocompleteField } from "../../../../forms/fields/AutocompleteField";
import {
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from "../../../Problem/interfaces";
import { HUMANIZED_PROGRAMMING_LANGUAGE_MAP } from "../FormattedProgrammingLanguage/FormattedProgrammingLanguage";

interface SubmissionProgrammingLanguageFilterFieldProps {
  name: string;
}

export const SubmissionProgrammingLanguageFilterField: FC<
  SubmissionProgrammingLanguageFilterFieldProps
> = ({ name }) => {
  return (
    <AutocompleteField
      name={name}
      options={SupportedProgrammingLanguages}
      getOptionLabel={(option: ProgrammingLanguage) =>
        HUMANIZED_PROGRAMMING_LANGUAGE_MAP[option]
      }
      renderInput={(params) => (
        <TextField {...params} label="Programming Language" />
      )}
    />
  );
};
