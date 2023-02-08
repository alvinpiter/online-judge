import { Typography } from "@mui/material";
import { FC } from "react";
import { ProgrammingLanguage } from "../../../Problem/interfaces";

const HUMANIZED_PROGRAMMING_LANGUAGE_MAP: Record<ProgrammingLanguage, string> =
  {
    JAVASCRIPT: "Javascript",
    PYTHON_3: "Python 3",
    CPP_11: "C++ 11",
  };

interface FormattedProgrammingLanguageProps {
  programmingLanguage: ProgrammingLanguage;
}

export const FormattedProgrammingLanguage: FC<
  FormattedProgrammingLanguageProps
> = ({ programmingLanguage }) => {
  return (
    <Typography variant="body2">
      {HUMANIZED_PROGRAMMING_LANGUAGE_MAP[programmingLanguage]}
    </Typography>
  );
};
