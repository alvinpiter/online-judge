import { ProgrammingLanguage } from "../modules/Problem/interfaces";

export const CODE_EDITOR_PROGRAMMING_LANGUAGE_MAPPER = new Map<
  ProgrammingLanguage,
  string
>([
  [ProgrammingLanguage.JAVASCRIPT, "javascript"],
  [ProgrammingLanguage.PYTHON_3, "python"],
  [ProgrammingLanguage.CPP_11, "cpp"],
]);
