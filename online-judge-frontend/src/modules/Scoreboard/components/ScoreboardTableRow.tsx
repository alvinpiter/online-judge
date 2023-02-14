import { Link, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { ROUTES } from "../../../constants/Routes";
import { Problem, UserProblemAttempt } from "../../Problem/interfaces";
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
        {row.schematicScore === null
          ? ""
          : moment(row.schematicScore.lastSolveTimeInMilliseconds).fromNow()}
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
