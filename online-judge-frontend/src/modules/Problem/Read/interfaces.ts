import { ProblemState } from "../interfaces";

export interface AdminProblemsFilter {
  state?: ProblemState;
}

export enum AdminProblemsOrderOption {
  BY_ID_ASC = "BY_ID_ASC",
  BY_ID_DESC = "BY_ID_DESC",
  BY_RATING_ASC = "BY_RATING_ASC",
  BY_RATING_DESC = "BY_RATING_DESC",
}
