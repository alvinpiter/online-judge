export enum ProgrammingLanguage {
  JAVASCRIPT = "JAVASCRIPT",
  PYTHON_3 = "PYTHON_3",
  CPP_11 = "CPP_11",
}

export const SupportedProgrammingLanguages = Object.keys(
  ProgrammingLanguage
) as ProgrammingLanguage[];

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

/*
TODO:
`state` is only applicable for admin's request, but this interface is also
used for user's request. Is there a better way to implement this interface?
 */
export interface ProblemsFilter {
  state?: ProblemState;
  ratingGte?: number;
  ratingLte?: number;
}

export enum ProblemsOrderOption {
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

export const MIN_PROBLEM_RATING = 0;
export const MAX_PROBLEM_RATING = 3000;
