import { ProgrammingLanguage } from "../../interfaces";

export interface SolutionTemplate {
  id: number;
  problemId: number;
  programmingLanguage: ProgrammingLanguage;
  template: string;
}
