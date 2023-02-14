import { FC, ReactNode, useEffect, useState } from "react";
import { useSnackbarContext } from "../../../../core/Snackbar";
import { ProgrammingLanguage } from "../../interfaces";
import { EditSolutionTemplatesContext } from "./context";
import { useUpsertSolutionTemplateRequest } from "../../hooks/useUpsertSolutionTemplateRequest";
import { useSolutionTemplatesMap } from "../../hooks/useSolutionTemplatesMap";
import { useGetAdminSolutionTemplatesRequest } from "../../hooks/useGetAdminSolutionTemplatesRequest";

interface EditSolutionTemplatesContextProviderProps {
  problemId: string;
  children?: ReactNode;
}

export const EditSolutionTemplatesContextProvider: FC<
  EditSolutionTemplatesContextProviderProps
> = ({ problemId, children }) => {
  const { openSnackbar } = useSnackbarContext();

  const { solutionTemplatesMap, setSolutionTemplatesMap } =
    useSolutionTemplatesMap(problemId, useGetAdminSolutionTemplatesRequest);

  const {
    isLoading: isUpsertingSolutionTemplate,
    result: upsertSolutionTemplateRequestResult,
    error: upsertSolutionTemplateRequestError,
    requestFunction: upsertSolutionTemplateRequest,
  } = useUpsertSolutionTemplateRequest(problemId);

  const [activeProgrammingLanguage, setActiveProgrammingLanguage] =
    useState<ProgrammingLanguage>(ProgrammingLanguage.JAVASCRIPT);

  const upsertTemplate = async (
    programmingLanguage: ProgrammingLanguage,
    template: string
  ) => {
    await upsertSolutionTemplateRequest({ programmingLanguage, template });
  };

  useEffect(() => {
    if (!isUpsertingSolutionTemplate && upsertSolutionTemplateRequestResult) {
      setSolutionTemplatesMap((prevSolutionTemplatesMap) => {
        const newSolutionTemplatesMap = new Map(prevSolutionTemplatesMap);

        newSolutionTemplatesMap.set(
          upsertSolutionTemplateRequestResult.programmingLanguage,
          upsertSolutionTemplateRequestResult.template
        );

        return newSolutionTemplatesMap;
      });

      openSnackbar("success", "Solution template is updated!");
    }
  }, [
    isUpsertingSolutionTemplate,
    upsertSolutionTemplateRequestResult,
    setSolutionTemplatesMap,
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
        activeTemplate:
          solutionTemplatesMap.get(activeProgrammingLanguage) || "",
        setActiveProgrammingLanguage,
        upsertTemplate,
      }}
    >
      {children}
    </EditSolutionTemplatesContext.Provider>
  );
};
