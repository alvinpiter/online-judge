import { CancelRounded, CheckCircle } from "@mui/icons-material";
import { Link, TableCell, TableRow, Tooltip } from "@mui/material";
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
            {
              problemId: problem.id.toString(),
              verdict: SubmissionVerdict.ACCEPTED,
            }
          )}
        >
          {problem.problemStatistics?.solverCount || 0}
        </Link>
      </TableCell>
      <TableCell>
        {problem.userAttemptType === UserProblemAttemptType.SOLVED && (
          <Tooltip title="Solved">
            <CheckCircle color="success" />
          </Tooltip>
        )}

        {problem.userAttemptType === UserProblemAttemptType.ATTEMPTED && (
          <Tooltip title="Attempted">
            <CancelRounded color="error" />
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};
