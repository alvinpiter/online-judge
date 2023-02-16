import { TextField } from "@mui/material";
import { FC } from "react";
import { AutocompleteField } from "../../../../forms/fields/AutocompleteField";
import { SubmissionVerdict } from "../../interfaces";
import { HUMANIZED_VERDICT_MAP } from "../FormattedSubmissionVerdict/FormattedSubmissionVerdict";

interface SubmissionVerdictFilterFieldProps {
  name: string;
}

export const SubmissionVerdictFilterField: FC<
  SubmissionVerdictFilterFieldProps
> = ({ name }) => {
  return (
    <AutocompleteField
      name={name}
      options={Object.keys(SubmissionVerdict)}
      getOptionLabel={(option: SubmissionVerdict) =>
        HUMANIZED_VERDICT_MAP[option]
      }
      renderInput={(params) => <TextField {...params} label="Verdict" />}
    />
  );
};
