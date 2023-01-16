export enum ProgrammingLanguage {
  JAVASCRIPT = 'JAVASCRIPT',
  PYTHON_3 = 'PYTHON_3',
  CPP_11 = 'CPP_11',
}

export const SupportedProgrammingLanguages = Object.keys(
  ProgrammingLanguage,
) as ProgrammingLanguage[];
