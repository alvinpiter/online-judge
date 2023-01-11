import { Link, TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../../../../constants/Routes";
import { Problem } from "../../interfaces";

interface UserProblemsTableItemProps {
  problem: Problem;
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
    </TableRow>
  );
};
