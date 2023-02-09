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
import { useGetUserStatisticsRequest } from "../hooks/useGetUserStatisticsRequest";

interface UserStatisticsTableProps {
  userId: number;
}

export const UserStatisticsTable: FC<UserStatisticsTableProps> = ({
  userId,
}) => {
  const { isLoading, result } = useGetUserStatisticsRequest(userId);

  if (isLoading || !result) {
    return <p> Loading user statistics... </p>;
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
                {result.rank === null ? "Unranked" : result.rank + 1}
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Solved problems</Typography>
            </TableCell>

            <TableCell>
              {result.solvedProblems.map((problem, idx) => (
                <Link
                  sx={{ ml: idx === 0 ? 0 : 2 }}
                  href={ROUTES.USER_PROBLEM_ROUTE.generatePath({
                    problemId: problem.id.toString(),
                  })}
                >
                  {problem.name},
                </Link>
              ))}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Attempted problems</Typography>
            </TableCell>

            <TableCell>
              {result.attemptedProblems.map((problem, idx) => (
                <Link
                  sx={{ ml: idx === 0 ? 0 : 2 }}
                  href={ROUTES.USER_PROBLEM_ROUTE.generatePath({
                    problemId: problem.id.toString(),
                  })}
                >
                  {problem.name},
                </Link>
              ))}
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
