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
import { SubmissionWithDetails } from "../../interfaces";
import { FormattedProgrammingLanguage } from "../FormattedProgrammingLanguage/FormattedProgrammingLanguage";
import { FormattedSubmissionVerdict } from "../FormattedSubmissionVerdict/FormattedSubmissionVerdict";

interface SubmissionSummaryProps {
  submission: SubmissionWithDetails;
}

export const SubmissionSummary: FC<SubmissionSummaryProps> = ({
  submission,
}) => {
  const overallRunTimeInMilliseconds = submission.runDetails
    .map((runDetail) => runDetail.runTimeInMilliseconds)
    .reduce((currentMax, runTime) => Math.max(currentMax, runTime), 0);

  const overallMemoryUsageInKilobytes = submission.runDetails
    .map((runDetail) => runDetail.memoryUsageInKilobytes)
    .reduce((currentMax, memoryUsage) => Math.max(currentMax, memoryUsage), 0);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell> Submitted at </TableCell>
            <TableCell>{new Date(submission.submittedAt).toString()}</TableCell>
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
            <TableCell>
              <FormattedProgrammingLanguage
                programmingLanguage={submission.programmingLanguage}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell> Verdict </TableCell>
            <TableCell>
              <FormattedSubmissionVerdict verdict={submission.verdict} />
            </TableCell>
          </TableRow>

          <TableRow sx={{ display: "none" }}>
            <TableCell> Run time </TableCell>
            <TableCell>{overallRunTimeInMilliseconds} ms</TableCell>
          </TableRow>

          <TableRow sx={{ display: "none" }}>
            <TableCell> Memory usage </TableCell>
            <TableCell>{overallMemoryUsageInKilobytes} KB</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
