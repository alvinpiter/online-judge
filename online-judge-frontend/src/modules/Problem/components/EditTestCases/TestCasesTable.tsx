import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { TestCase } from "../../interfaces";
import { TestCasesTableItem } from "./TestCasesTableItem";

interface TestCasesTableProps {
  testCases: TestCase[];
  onDeleteTestCase: (testCaseId: number) => void;
}

export const TestCasesTable: FC<TestCasesTableProps> = ({
  testCases,
  onDeleteTestCase,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> # </TableCell>
            <TableCell> Input File </TableCell>
            <TableCell> Output File </TableCell>
            <TableCell> Action </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testCases.map((testCase, idx) => (
            <TestCasesTableItem
              order={idx + 1}
              testCase={testCase}
              onDelete={() => onDeleteTestCase(testCase.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
