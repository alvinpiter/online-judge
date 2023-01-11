import { Problem, ProgrammingLanguage } from "../Problem/interfaces";
import { User } from "../User/interface";

export enum SubmissionVerdict {
  COMPILE_ERROR = "COMPILE_ERROR",
  RUN_TIME_ERROR = "RUN_TIME_ERROR",
  WRONG_ANSWER = "WRONG_ANSWER",
  TIME_LIMIT_EXCEEDED = "TIME_LIMIT_EXCEEDED",
  ACCEPTED = "ACCEPTED",
}

export interface Submission {
  id: number;
  problem: Problem;
  user: User;
  programmingLanguage: ProgrammingLanguage;
  code: string;
  submittedAt: string;
  verdict: SubmissionVerdict;
}
