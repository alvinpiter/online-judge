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
import { Submission } from "../../interfaces";
import { SubmissionsTableItem } from "./SubmissionsTableItem";

interface SubmissionsTableProps {
  submissions: Submission[];
}

export const SubmissionsTable: FC<SubmissionsTableProps> = ({
  submissions,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> ID </TableCell>
            <TableCell> Problem </TableCell>
            <TableCell> User </TableCell>
            <TableCell> Programming Language </TableCell>
            <TableCell> Verdict </TableCell>
            <TableCell> Submitted at </TableCell>
            <TableCell> Detail </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.map((submission, idx) => (
            <SubmissionsTableItem key={idx} submission={submission} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
