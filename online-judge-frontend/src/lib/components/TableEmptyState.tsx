import { TableCell, TableRow, Typography } from "@mui/material";
import { FC } from "react";

export interface TableEmptyStateProps {
  message: string;
  colSpan: number;
}

export const TableEmptyState: FC<TableEmptyStateProps> = ({
  message,
  colSpan,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        <Typography variant="caption">{message}</Typography>
      </TableCell>
    </TableRow>
  );
};
