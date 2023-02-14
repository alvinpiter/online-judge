import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../../../constants/Routes";
import { LoadingState } from "../../../lib/components/LoadingState";
import { Problem } from "../../Problem/interfaces";
import { useGetUserStatisticsRequest } from "../hooks/useGetUserStatisticsRequest";

interface UserStatisticsTableProps {
  userId: number;
}

export const UserStatisticsTable: FC<UserStatisticsTableProps> = ({
  userId,
}) => {
  const { isLoading: isLoadingUserStatistics, result: userStatistics } =
    useGetUserStatisticsRequest(userId);

  if (isLoadingUserStatistics) {
    return <LoadingState />;
  }

  if (!userStatistics) {
    return null;
  }

  return (
    <TableContainer component={Paper} sx={{ width: "66%" }}>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Rank</Typography>
            </TableCell>

            <TableCell>
              <Typography variant="body1">
                {userStatistics.rank === null
                  ? "Unranked"
                  : userStatistics.rank + 1}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Solved problems</Typography>
            </TableCell>

            <TableCell>
              <CommaSeparatedProblems
                problems={userStatistics.solvedProblems}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Attempted problems</Typography>
            </TableCell>

            <TableCell>
              <CommaSeparatedProblems
                problems={userStatistics.attemptedProblems}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">All submissions</Typography>
            </TableCell>

            <TableCell>
              <Link
                href={ROUTES.USER_SUBMISSIONS_ROUTE.generatePath({
                  userId: userId.toString(),
                })}
              >
                All submissions
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CommaSeparatedProblems: FC<{
  problems: Pick<Problem, "id" | "name">[];
}> = ({ problems }) => {
  return (
    <>
      {problems.map((problem, idx) => (
        <Link
          key={problem.id}
          sx={{ ml: idx === 0 ? 0 : 2 }}
          href={ROUTES.USER_PROBLEM_ROUTE.generatePath({
            problemId: problem.id.toString(),
          })}
        >
          {problem.name}
          {idx < problems.length - 1 ? "," : ""}
        </Link>
      ))}
    </>
  );
};
