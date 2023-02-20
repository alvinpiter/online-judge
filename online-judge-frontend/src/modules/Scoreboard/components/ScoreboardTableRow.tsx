import { Link, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { config } from "../../../config";
import { ROUTES } from "../../../constants/Routes";
import { Problem, UserProblemAttempt } from "../../Problem/interfaces";
import { formatLastSolveAt } from "../helpers/formatLastSolveAt";
import { ScoreboardRow } from "../interfaces";
import { UserProblemAttemptCell } from "./UserProblemAttemptCell";

interface ScoreboardTableRowProps {
  problems: Problem[];
  row: ScoreboardRow;
}

export const ScoreboardTableRow: FC<ScoreboardTableRowProps> = ({
  problems,
  row,
}) => {
  const contestStartTimeInMilliseconds = config.contestStartTimeInMilliseconds;
  const userProblemAttemptsMap = new Map<number, UserProblemAttempt>(
    row.userProblemAttempts.map((userProblemAttempt) => [
      userProblemAttempt.problemId,
      userProblemAttempt,
    ])
  );

  return (
    <TableRow>
      <TableCell> {row.rank === null ? "Unranked" : row.rank + 1} </TableCell>
      <TableCell>
        <Link
          href={ROUTES.USER_PROFILE_ROUTE.generatePath({
            userId: row.user.id.toString(),
          })}
        >
          {row.user.username}
        </Link>
      </TableCell>
      <TableCell>
        {row.schematicScore === null ? 0 : row.schematicScore.solveCount}
      </TableCell>
      <TableCell>
        {row.schematicScore === null || row.schematicScore.solveCount === 0
          ? ""
          : formatLastSolveAt(
              row.schematicScore.lastSolveTimeInMilliseconds,
              contestStartTimeInMilliseconds
            )}
      </TableCell>
      {problems.map((problem) => (
        <TableCell key={problem.id}>
          <UserProblemAttemptCell
            userProblemAttempt={userProblemAttemptsMap.get(problem.id)}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
