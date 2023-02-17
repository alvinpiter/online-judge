import {
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { TableEmptyState } from "../../../../lib/components/TableEmptyState";
import { humanizeProblemsOrderOption } from "../../helpers/humanizeProblemsOrderOption";
import { ProblemsOrderOption, ProblemWithDetail } from "../../interfaces";
import { UserProblemsTableItem } from "./UserProblemsTableItem";

interface UserProblemsTableProps {
  problems: ProblemWithDetail[];
  order: ProblemsOrderOption;
  onOrderChange: (newOrder: ProblemsOrderOption) => void;
}

export const UserProblemsTable: FC<UserProblemsTableProps> = ({
  problems,
  order,
  onOrderChange,
}) => {
  const handleOrderChange = (event: SelectChangeEvent) => {
    onOrderChange(event.target.value as ProblemsOrderOption);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            Order by
          </Typography>
          <Select size="small" value={order} onChange={handleOrderChange}>
            {Object.keys(ProblemsOrderOption).map((order) => (
              <MenuItem key={order} value={order}>
                {humanizeProblemsOrderOption(order as ProblemsOrderOption)}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell> ID </TableCell>
              <TableCell> Name </TableCell>
              <TableCell> Rating </TableCell>
              <TableCell> Solver count </TableCell>
              <TableCell> State </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.length === 0 ? (
              <TableEmptyState colSpan={4} message="No problems found" />
            ) : (
              problems.map((problem, idx) => (
                <UserProblemsTableItem key={idx} problem={problem} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
