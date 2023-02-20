import { Button, Stack, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../../../../constants/Routes";
import { ProblemWithDetail } from "../../interfaces";
import { ProblemStateActionButton } from "./ProblemStateActionButton";

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
      <TableCell> {problem.problemStatistics?.solverCount || 0} </TableCell>
      <TableCell> {problem.state} </TableCell>
      <TableCell>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            href={ROUTES.EDIT_PROBLEM_ROUTE.generatePath({
              problemId: problem.id.toString(),
            })}
          >
            Edit
          </Button>
          <ProblemStateActionButton problem={problem} />
        </Stack>
      </TableCell>
    </TableRow>
  );
};
