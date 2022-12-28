import { FC } from "react";
import { useEditTestCasesContext } from "../contexts/EditTestCasesContext/context";
import { AddTestCaseForm } from "./AddTestCaseForm";
import { TestCasesTable } from "./TestCasesTable";

export const EditTestCasesTabContent: FC = () => {
  const { testCases, addTestCase, deleteTestCase } = useEditTestCasesContext();

  return (
    <>
      <AddTestCaseForm onSubmit={addTestCase} />
      <TestCasesTable testCases={testCases} onDeleteTestCase={deleteTestCase} />
    </>
  );
};
