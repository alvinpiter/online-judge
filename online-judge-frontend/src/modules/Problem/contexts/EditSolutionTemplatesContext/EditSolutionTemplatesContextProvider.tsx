import { FC, ReactNode, useEffect, useState } from "react";
import { useSnackbarContext } from "../../../../core/Snackbar";
import { ProgrammingLanguage } from "../../interfaces";
import { useGetSolutionTemplatesRequest } from "../../hooks/useGetSolutionTemplatesRequest";
import { EditSolutionTemplatesContext } from "./context";
import { useUpsertSolutionTemplateRequest } from "../../hooks/useUpsertSolutionTemplateRequest";

interface EditSolutionTemplatesContextProviderProps {
  problemId: string;
  children?: ReactNode;
}

export const EditSolutionTemplatesContextProvider: FC<
  EditSolutionTemplatesContextProviderProps
> = ({ problemId, children }) => {
  const { openSnackbar } = useSnackbarContext();

  const {
    isLoading: isLoadingSolutionTemplates,
    result: getSolutionTemplatesRequestResult,
  } = useGetSolutionTemplatesRequest(problemId);

  const {
    isLoading: isUpsertingSolutionTemplate,
    result: upsertSolutionTemplateRequestResult,
    error: upsertSolutionTemplateRequestError,
    requestFunction: upsertSolutionTemplateRequest,
  } = useUpsertSolutionTemplateRequest(problemId);

  const [activeProgrammingLanguage, setActiveProgrammingLanguage] =
    useState<ProgrammingLanguage>(ProgrammingLanguage.JAVASCRIPT);

  const [templateMap, setTemplateMap] = useState<
    Map<ProgrammingLanguage, string>
  >(new Map());

  const upsertTemplate = (
    programmingLanguage: ProgrammingLanguage,
    template: string
  ) => {
    upsertSolutionTemplateRequest({ programmingLanguage, template });
  };

  useEffect(() => {
    if (!isLoadingSolutionTemplates && getSolutionTemplatesRequestResult) {
      const newTemplateMap = new Map<ProgrammingLanguage, string>();
      getSolutionTemplatesRequestResult.map((template) =>
        newTemplateMap.set(template.programmingLanguage, template.template)
      );

      setTemplateMap(newTemplateMap);
    }
  }, [isLoadingSolutionTemplates, getSolutionTemplatesRequestResult]);

  useEffect(() => {
    if (!isUpsertingSolutionTemplate && upsertSolutionTemplateRequestResult) {
      setTemplateMap((prevTemplateMap) => {
        const newTemplateMap = new Map(prevTemplateMap);
        newTemplateMap.set(
          upsertSolutionTemplateRequestResult.programmingLanguage,
          upsertSolutionTemplateRequestResult.template
        );

        return newTemplateMap;
      });

      openSnackbar("success", "Solution template is updated!");
    }
  }, [
    isUpsertingSolutionTemplate,
    upsertSolutionTemplateRequestResult,
    openSnackbar,
  ]);

  useEffect(() => {
    if (!isUpsertingSolutionTemplate && upsertSolutionTemplateRequestError) {
      openSnackbar("error", upsertSolutionTemplateRequestError.message);
    }
  }, [
    isUpsertingSolutionTemplate,
    upsertSolutionTemplateRequestError,
    openSnackbar,
  ]);

  return (
    <EditSolutionTemplatesContext.Provider
      value={{
        activeProgrammingLanguage,
        activeTemplate: templateMap.get(activeProgrammingLanguage) || "",
        setActiveProgrammingLanguage,
        upsertTemplate,
      }}
    >
      {children}
    </EditSolutionTemplatesContext.Provider>
  );
};
