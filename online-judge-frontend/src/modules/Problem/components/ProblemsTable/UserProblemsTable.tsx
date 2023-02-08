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
import { UserProblemsTableItem } from "./UserProblemsTableItem";

interface UserProblemsTableProps {
  problems: ProblemWithDetail[];
}

export const UserProblemsTable: FC<UserProblemsTableProps> = ({ problems }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> ID </TableCell>
            <TableCell> Name </TableCell>
            <TableCell> Rating </TableCell>
            <TableCell> Solved by </TableCell>
            <TableCell> Attempt type </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.map((problem, idx) => (
            <UserProblemsTableItem key={idx} problem={problem} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
