import {
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { useDeleteTestCaseRequest } from "../../hooks/useDeleteTestCaseRequest";
import {
  ProblemTestCase,
  useGetTestCaseRequest,
} from "../../hooks/useGetTestCasesRequest";
import { AddTestCaseForm } from "./AddTestCaseForm";
import { EditProblemTabBaseProps } from "./interface";

export const EditProblemTestCasesTab: FC<EditProblemTabBaseProps> = ({
  isActive,
  problemId,
}) => {
  const {
    isLoading: isLoadingInitialProblemTestCases,
    result: initialProblemTestCases,
  } = useGetTestCaseRequest(problemId);

  const { requestFuncion: deleteProblemTestCaseRequest } =
    useDeleteTestCaseRequest();

  const [problemTestCases, setProblemTestCases] = useState<ProblemTestCase[]>(
    []
  );

  const addProblemTestCase = useCallback((problemTestCase: ProblemTestCase) => {
    setProblemTestCases((prevProblemTestCases) => [
      ...prevProblemTestCases,
      problemTestCase,
    ]);
  }, []);

  const deleteProblemTestCase = useCallback((testCaseId: number) => {
    deleteProblemTestCaseRequest({
      problemId: parseInt(problemId),
      testCaseId,
    });

    setProblemTestCases((prevProblemTestCases) =>
      prevProblemTestCases.filter((testCase) => testCase.id !== testCaseId)
    );
  }, []);

  useEffect(() => {
    if (!isLoadingInitialProblemTestCases && initialProblemTestCases) {
      setProblemTestCases(initialProblemTestCases);
    }
  }, [isLoadingInitialProblemTestCases, initialProblemTestCases]);

  if (!isActive) {
    return null;
  }

  return (
    <>
      {problemTestCases && (
        <ProblemTestCaseTable
          problemId={problemId}
          problemTestCases={problemTestCases}
          onDeleteProblemTestCase={deleteProblemTestCase}
        />
      )}
      <AddTestCaseForm problemId={problemId} onSuccess={addProblemTestCase} />
    </>
  );
};

export interface ProblemTestCaseTableProps {
  problemId: string;
  problemTestCases: ProblemTestCase[];
  onDeleteProblemTestCase: (testCaseId: number) => void;
}

export const ProblemTestCaseTable: FC<ProblemTestCaseTableProps> = ({
  problemId,
  problemTestCases,
  onDeleteProblemTestCase,
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
          {problemTestCases.map((problemTestCase, idx) => (
            <ProblemTestCaseTableItem
              key={idx}
              idx={idx + 1}
              problemId={problemId}
              problemTestCase={problemTestCase}
              onDelete={() => onDeleteProblemTestCase(problemTestCase.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export interface ProblemTestCaseTableItemProps {
  idx: number;
  problemId: string;
  problemTestCase: ProblemTestCase;
  onDelete: () => void;
}

export const ProblemTestCaseTableItem: FC<ProblemTestCaseTableItemProps> = ({
  idx,
  problemId,
  problemTestCase,
  onDelete,
}) => {
  return (
    <TableRow key={problemTestCase.id}>
      <TableCell> {idx} </TableCell>
      <TableCell>
        <Link href={problemTestCase.inputFile.url}>
          {problemTestCase.inputFile.name}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={problemTestCase.outputFile.url}>
          {problemTestCase.outputFile.name}
        </Link>
      </TableCell>
      <TableCell>
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
