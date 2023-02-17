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
import { SubmissionRunDetail } from "../../interfaces";
import { SubmissionRunDetailsTableItem } from "./SubmissionRunDetailsTableItem";

interface SubmissionRunDetailsTableProps {
  runDetails: SubmissionRunDetail[];
}

export const SubmissionRunDetailsTable: FC<SubmissionRunDetailsTableProps> = ({
  runDetails,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> Input </TableCell>
            <TableCell> Expected output </TableCell>
            <TableCell> Actual output </TableCell>
            {/* <TableCell> Run time </TableCell>
            <TableCell> Memory usage </TableCell> */}
            <TableCell> Verdict </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {runDetails.map((runDetail, idx) => (
            <SubmissionRunDetailsTableItem key={idx} runDetail={runDetail} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
