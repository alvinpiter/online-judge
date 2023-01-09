import { useEffect, useState } from "react";
import { AppError } from "../../../AppError";
import { ProgrammingLanguage, SolutionTemplate } from "../interfaces";

type UseGetSolutionTemplatesRequestHook<T> = (problemId: string) => {
  isLoading: boolean;
  result: T[] | undefined;
  error: AppError | undefined;
  requestFunction: () => Promise<void>;
};

export function useSolutionTemplatesMap<T extends SolutionTemplate>(
  problemId: string,
  useGetSolutionTemplatesRequest: UseGetSolutionTemplatesRequestHook<T>
) {
  const [solutionTemplatesMap, setSolutionTemplatesMap] = useState<
    Map<ProgrammingLanguage, string>
  >(new Map());

  const { result: solutionTemplates } =
    useGetSolutionTemplatesRequest(problemId);

  useEffect(() => {
    if (solutionTemplates) {
      const newSolutionTemplatesMap = new Map<ProgrammingLanguage, string>();

      solutionTemplates.forEach((solutionTemplate) =>
        newSolutionTemplatesMap.set(
          solutionTemplate.programmingLanguage,
          solutionTemplate.template
        )
      );

      setSolutionTemplatesMap(newSolutionTemplatesMap);
    }
  }, [solutionTemplates]);

  return { solutionTemplatesMap, setSolutionTemplatesMap };
}
