import { Problem } from "../../Problem/interfaces";

export interface GlobalStatistics {
  numberOfUsers: number;
  numberOfProblems: number;
  numberOfSubmissions: number;
}

export interface UserStatistics {
  rank: number | null;
  solvedProblems: Pick<Problem, "id" | "name">[];
  attemptedProblems: Pick<Problem, "id" | "name">[];
}
