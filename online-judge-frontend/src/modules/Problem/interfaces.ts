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
  rating: number;
}

export interface AdminProblemsFilter {
  state?: ProblemState;
}

export enum AdminProblemsOrderOption {
  BY_ID_ASC = "BY_ID_ASC",
  BY_ID_DESC = "BY_ID_DESC",
  BY_RATING_ASC = "BY_RATING_ASC",
  BY_RATING_DESC = "BY_RATING_DESC",
}

export interface SolutionTemplate {
  id: number;
  problemId: number;
  programmingLanguage: ProgrammingLanguage;
  template: string;
}

export interface TestCase {
  id: number;
  inputFile: {
    name: string;
    url: string;
  };
  outputFile: {
    name: string;
    url: string;
  };
}
