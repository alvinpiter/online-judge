export enum ProgrammingLanguage {
  JAVASCRIPT = "JAVASCRIPT",
  PYTHON_3 = "PYTHON_3",
}

export const SupportedProgrammingLanguages = [
  ProgrammingLanguage.JAVASCRIPT,
  ProgrammingLanguage.PYTHON_3,
];

export enum ProblemState {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export interface Problem {
  id: number;
  name: string;
  description: string;
  state: ProblemState;
}
