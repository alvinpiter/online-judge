import { Link, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { ROUTES } from "../../../../constants/Routes";
import { Submission } from "../../interfaces";

interface SubmissionsTableItemProps {
  submission: Submission;
}

export const SubmissionsTableItem: FC<SubmissionsTableItemProps> = ({
  submission,
}) => {
  const { problem, user } = submission;

  return (
    <TableRow>
      <TableCell> {submission.id} </TableCell>
      <TableCell>
        <Link
          href={ROUTES.USER_PROBLEM_ROUTE.generatePath({
            problemId: problem.id.toString(),
          })}
        >
          {problem.name}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          href={ROUTES.USER_PROFILE_ROUTE.generatePath({
            userId: user.id.toString(),
          })}
        >
          {user.username}
        </Link>
      </TableCell>
      <TableCell> {submission.programmingLanguage} </TableCell>
      <TableCell> {submission.verdict} </TableCell>
      <TableCell>{moment(submission.submittedAt).fromNow()}</TableCell>
      <TableCell>
        <Link href="#"> Detail </Link>
      </TableCell>
    </TableRow>
  );
};
