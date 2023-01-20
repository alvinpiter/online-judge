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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> ID </TableCell>
            <TableCell> Name </TableCell>
            <TableCell> Rating </TableCell>
            <TableCell> State </TableCell>
            <TableCell> Action </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.map((problem, idx) => (
            <AdminProblemsTableItem key={idx} problem={problem} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
