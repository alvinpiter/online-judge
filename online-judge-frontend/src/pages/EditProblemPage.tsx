import { Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";

export const EditProblemPage: FC = () => {
  const params = useParams<{ problemId: string }>();
  return (
    <Typography variant="h4"> Edit problem {params.problemId} </Typography>
  );
};
