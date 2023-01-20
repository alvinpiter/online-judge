import { Link, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../../../../constants/Routes";
import { ProblemWithDetail } from "../../interfaces";

interface UserProblemsTableItemProps {
  problem: ProblemWithDetail;
}

export const UserProblemsTableItem: FC<UserProblemsTableItemProps> = ({
  problem,
}) => {
  return (
    <TableRow>
      <TableCell> {problem.id} </TableCell>
      <TableCell>
        <Link
          href={ROUTES.USER_PROBLEM_ROUTE.generatePath({
            problemId: problem.id.toString(),
          })}
        >
          {problem.name}
        </Link>
      </TableCell>
      <TableCell> {problem.rating} </TableCell>

      <TableCell>
        <Link
          href={ROUTES.SUBMISSIONS_ROUTE.generatePath(
            {},
            { problemId: problem.id.toString() }
          )}
        >
          {problem.problemStatistics?.solverCount || 0}
        </Link>
      </TableCell>
      <TableCell> {problem.userAttemptType} </TableCell>
    </TableRow>
  );
};
