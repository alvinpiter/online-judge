import { ProgrammingLanguage } from "../../../../interfaces";

export interface EditSolutionTemplatesContextValue {
  activeProgrammingLanguage: ProgrammingLanguage;
  activeTemplate: string;
  setActiveProgrammingLanguage: (language: ProgrammingLanguage) => void;
  upsertTemplate: (language: ProgrammingLanguage, template: string) => void;
}
