import { CancelRounded, CheckCircle } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { UserProblemAttempt } from "../../Problem/interfaces";

interface UserProblemAttemptCellProps {
  userProblemAttempt?: UserProblemAttempt;
}

export const UserProblemAttemptCell: FC<UserProblemAttemptCellProps> = ({
  userProblemAttempt,
}) => {
  if (!userProblemAttempt) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userProblemAttempt.firstSolvedAt !== null ? (
        <Tooltip title="Solved">
          <CheckCircle color="success" />
        </Tooltip>
      ) : (
        <Tooltip title="Attempted">
          <CancelRounded color="error" />
        </Tooltip>
      )}
      <Typography variant="caption">
        {userProblemAttempt.numberOfAttempts} attempt(s)
      </Typography>
    </Box>
  );
};
