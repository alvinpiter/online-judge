import { Button, Link, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { TestCase } from "../interfaces";

interface TestCaseTableItemProps {
  order: number;
  testCase: TestCase;
  onDelete: () => void;
}

export const TestCaseTableItem: FC<TestCaseTableItemProps> = ({
  order,
  testCase,
  onDelete,
}) => {
  return (
    <TableRow key={testCase.id}>
      <TableCell> {order} </TableCell>
      <TableCell>
        <Link href={testCase.inputFile.url}>{testCase.inputFile.name}</Link>
      </TableCell>
      <TableCell>
        <Link href={testCase.outputFile.url}>{testCase.outputFile.name}</Link>
      </TableCell>
      <TableCell>
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
