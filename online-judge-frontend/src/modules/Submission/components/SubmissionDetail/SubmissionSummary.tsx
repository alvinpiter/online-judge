import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../../../../constants/Routes";
import { Submission } from "../../interfaces";

interface SubmissionSummaryProps {
  submission: Submission;
}

export const SubmissionSummary: FC<SubmissionSummaryProps> = ({
  submission,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell> Submission Time </TableCell>
            <TableCell>
              {new Date(submission.submittedAt).toLocaleTimeString()}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell> Problem </TableCell>
            <TableCell>
              <Link
                href={ROUTES.USER_PROBLEM_ROUTE.generatePath({
                  problemId: submission.problem.id.toString(),
                })}
              >
                {submission.problem.name}
              </Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell> User </TableCell>
            <TableCell>
              <Link
                href={ROUTES.USER_PROFILE_ROUTE.generatePath({
                  userId: submission.user.id.toString(),
                })}
              >
                {submission.user.username}
              </Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell> Programming Language </TableCell>
            <TableCell> {submission.programmingLanguage} </TableCell>
          </TableRow>

          <TableRow>
            <TableCell> Verdict </TableCell>
            <TableCell>{submission.verdict}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
