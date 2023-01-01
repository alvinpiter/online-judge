import { Button, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { Problem } from "../../interfaces";

interface AdminProblemsTableItemProps {
  problem: Problem;
}

export const AdminProblemsTableItem: FC<AdminProblemsTableItemProps> = ({
  problem,
}) => {
  return (
    <TableRow>
      <TableCell> {problem.name} </TableCell>
      <TableCell> {problem.state} </TableCell>
      <TableCell>
        <Button variant="contained"> Edit </Button>
      </TableCell>
    </TableRow>
  );
};
