import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../../../constants/Routes";
import { Problem } from "../../Problem/interfaces";
import { ScoreboardRow } from "../interfaces";
import { ScoreboardTableRow } from "./ScoreboardTableRow";

interface ScoreboardTableProps {
  problems: Problem[];
  rows: ScoreboardRow[];
}

export const ScoreboardTable: FC<ScoreboardTableProps> = ({
  problems,
  rows,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> Rank </TableCell>
            <TableCell> User </TableCell>
            <TableCell> Solve count </TableCell>
            <TableCell> Last solve at </TableCell>
            {problems.map((problem) => (
              <TableCell>
                <Link
                  href={ROUTES.USER_PROBLEM_ROUTE.generatePath({
                    problemId: problem.id.toString(),
                  })}
                >
                  {problem.name}
                </Link>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <ScoreboardTableRow problems={problems} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
