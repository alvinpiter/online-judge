import { Button, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../../../../constants/Routes";
import { ProblemWithDetail } from "../../interfaces";

interface AdminProblemsTableItemProps {
  problem: ProblemWithDetail;
}

export const AdminProblemsTableItem: FC<AdminProblemsTableItemProps> = ({
  problem,
}) => {
  return (
    <TableRow>
      <TableCell> {problem.id} </TableCell>
      <TableCell> {problem.name} </TableCell>
      <TableCell> {problem.rating} </TableCell>
      <TableCell> {problem.state} </TableCell>
      <TableCell>
        <Button
          variant="contained"
          href={ROUTES.EDIT_PROBLEM_ROUTE.generatePath({
            problemId: problem.id.toString(),
          })}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};
