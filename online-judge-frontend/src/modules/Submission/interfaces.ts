import { Problem, ProgrammingLanguage, TestCase } from "../Problem/interfaces";
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

export interface SubmissionWithDetails extends Submission {
  compilationDetail?: SubmissionCompilationDetail;
  runDetails: SubmissionRunDetail[];
}

export interface SubmissionCompilationDetail {
  id: number;
  message: string;
}

export interface SubmissionRunDetail {
  id: number;
  runTimeInMilliseconds: number;
  memoryUsageInKilobytes: number;
  output?: string;
  verdict: SubmissionVerdict;
  testCase: TestCase;
}

export interface SubmissionsFilter {
  userId?: number;
  problemId?: number;
  programmingLanguage?: ProgrammingLanguage;
  verdict?: SubmissionVerdict;
}

export enum SubmissionsOrderOption {
  BY_ID_DESC = "BY_ID_DESC",
}
