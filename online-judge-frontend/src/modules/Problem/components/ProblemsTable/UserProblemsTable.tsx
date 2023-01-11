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
import { Problem } from "../../interfaces";
import { UserProblemsTableItem } from "./UserProblemsTableItem";

interface UserProblemsTableProps {
  problems: Problem[];
}

export const UserProblemsTable: FC<UserProblemsTableProps> = ({ problems }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> ID </TableCell>
            <TableCell> Name </TableCell>
            <TableCell> Rating </TableCell>
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
