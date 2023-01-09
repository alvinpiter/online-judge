import { Typography } from "@mui/material";
import { FC } from "react";

interface ProblemSubmissionsTabProps {
  problemId: string;
}

export const ProblemSubmissionsTab: FC<ProblemSubmissionsTabProps> = () => {
  return <Typography variant="h5"> Problem submissions tab </Typography>;
};
