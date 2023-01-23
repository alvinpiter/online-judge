import { TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { Problem, UserProblemAttempt } from "../../Problem/interfaces";
import { ScoreboardRow } from "../interfaces";
import { UserProblemAttemptCellContent } from "./UserProblemAttempt";

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
      <TableCell> rank </TableCell>
      <TableCell>{row.user.username}</TableCell>
      <TableCell> score </TableCell>
      {problems.map((problem) => (
        <TableCell>
          <UserProblemAttemptCellContent
            userProblemAttempt={userProblemAttemptsMap.get(problem.id)}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
