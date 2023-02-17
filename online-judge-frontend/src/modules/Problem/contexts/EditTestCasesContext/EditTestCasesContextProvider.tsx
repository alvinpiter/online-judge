import { FC, ReactNode, useEffect, useState } from "react";
import { useSnackbarContext } from "../../../../core/Snackbar";
import { useAddTestCaseRequest } from "../../hooks/useAddTestCaseRequest";
import { EditTestCasesContext } from "./context";
import { useGetTestCaseRequest } from "../../hooks/useGetTestCasesRequest";
import { useDeleteTestCaseRequest } from "../../hooks/useDeleteTestCaseRequest";
import { TestCase } from "../../interfaces";

interface EditTestCasesContextProviderProps {
  problemId: string;
  children?: ReactNode;
}

export const EditTestCasesContextProvider: FC<
  EditTestCasesContextProviderProps
> = ({ problemId, children }) => {
  const { openSnackbar } = useSnackbarContext();
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  const { isLoading: isLoadingTestCases, result: getTestCasesRequestResult } =
    useGetTestCaseRequest(problemId);

  const {
    isLoading: isAddingTestCase,
    result: addTestCaseRequestResult,
    requestFunction: addTestCaseRequest,
  } = useAddTestCaseRequest(problemId);

  const {
    isLoading: isDeletingTestCase,
    result: deleteTestCaseRequestResult,
    requestFunction: deleteTestCaseRequest,
  } = useDeleteTestCaseRequest();

  const addTestCase = (formData: FormData) => {
    addTestCaseRequest(formData);
  };

  const deleteTestCase = (testCaseId: number) => {
    deleteTestCaseRequest({ problemId, testCaseId: testCaseId.toString() });
  };

  useEffect(() => {
    if (!isLoadingTestCases && getTestCasesRequestResult) {
      setTestCases(getTestCasesRequestResult);
    }
  }, [isLoadingTestCases, getTestCasesRequestResult]);

  useEffect(() => {
    if (!isAddingTestCase && addTestCaseRequestResult) {
      setTestCases((prevTestCases) => [
        ...prevTestCases,
        addTestCaseRequestResult,
      ]);

      openSnackbar("success", "Test cases added!");
    }
  }, [isAddingTestCase, addTestCaseRequestResult, openSnackbar]);

  useEffect(() => {
    if (!isDeletingTestCase && deleteTestCaseRequestResult) {
      setTestCases((prevTestCases) =>
        prevTestCases.filter(
          (testCase) => testCase.id !== deleteTestCaseRequestResult.id
        )
      );

      openSnackbar("success", "Test case deleted!");
    }
  }, [isDeletingTestCase, deleteTestCaseRequestResult, openSnackbar]);

  return (
    <EditTestCasesContext.Provider
      value={{ testCases, addTestCase, deleteTestCase }}
    >
      {children}
    </EditTestCasesContext.Provider>
  );
};
