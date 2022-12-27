export enum ProgrammingLanguage {
  JAVASCRIPT = "JAVASCRIPT",
  PYTHON_3 = "PYTHON_3",
}

export const SupportedProgrammingLanguages = [
  ProgrammingLanguage.JAVASCRIPT,
  ProgrammingLanguage.PYTHON_3,
];

export interface ProblemSolutionTemplate {
  id: number;
  problemId: number;
  programmingLanguage: ProgrammingLanguage;
  template: string;
}
