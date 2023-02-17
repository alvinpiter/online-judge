import { Box } from "@mui/material";
import { FC } from "react";
import { useEditTestCasesContext } from "../../contexts/EditTestCasesContext/context";
import { AddTestCaseForm } from "./AddTestCaseForm";
import { TestCasesTable } from "./TestCasesTable";

export const EditTestCasesTabContent: FC = () => {
  const { testCases, addTestCase, deleteTestCase } = useEditTestCasesContext();

  return (
    <Box sx={{ mt: 2 }}>
      <AddTestCaseForm onSubmit={addTestCase} />

      <Box sx={{ mt: 2 }}>
        <TestCasesTable
          testCases={testCases}
          onDeleteTestCase={deleteTestCase}
        />
      </Box>
    </Box>
  );
};
