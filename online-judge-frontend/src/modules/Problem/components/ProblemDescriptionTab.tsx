import { Typography } from "@mui/material";
import { FC } from "react";

interface ProblemDescriptionTabProps {
  problemId: string;
}

export const ProblemDescriptionTab: FC<ProblemDescriptionTabProps> = () => {
  return <Typography variant="h5"> Problem description tab </Typography>;
};
