import { Link, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../../../../constants/Routes";
import { SubmissionVerdict } from "../../../Submission/interfaces";
import { ProblemWithDetail, UserProblemAttemptType } from "../../interfaces";

interface UserProblemsTableItemProps {
  problem: ProblemWithDetail;
}

export const UserProblemsTableItem: FC<UserProblemsTableItemProps> = ({
  problem,
}) => {
  let backgroundColor;
  switch (problem.userAttemptType) {
    case UserProblemAttemptType.SOLVED:
      backgroundColor = "#d4edc9";
      break;
    case UserProblemAttemptType.ATTEMPTED:
      backgroundColor = "#ffe3e3";
      break;
    default:
      backgroundColor = undefined;
  }

  return (
    <TableRow sx={{ backgroundColor }}>
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
            {
              problemId: problem.id.toString(),
              verdict: SubmissionVerdict.ACCEPTED,
            }
          )}
        >
          {problem.problemStatistics?.solverCount || 0}
        </Link>
      </TableCell>
    </TableRow>
  );
};
