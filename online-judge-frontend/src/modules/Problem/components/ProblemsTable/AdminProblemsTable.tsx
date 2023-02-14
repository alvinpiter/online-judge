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
import { TableEmptyState } from "../../../../lib/components/TableEmptyState";
import { ProblemWithDetail } from "../../interfaces";
import { AdminProblemsTableItem } from "./AdminProblemsTableItem";

interface AdminProblemsTableProps {
  problems: ProblemWithDetail[];
}

export const AdminProblemsTable: FC<AdminProblemsTableProps> = ({
  problems,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> ID </TableCell>
            <TableCell> Name </TableCell>
            <TableCell> Rating </TableCell>
            <TableCell> Solved by </TableCell>
            <TableCell> State </TableCell>
            <TableCell> Action </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.length === 0 ? (
            <TableEmptyState colSpan={6} message="No problems found" />
          ) : (
            problems.map((problem, idx) => (
              <AdminProblemsTableItem key={idx} problem={problem} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
