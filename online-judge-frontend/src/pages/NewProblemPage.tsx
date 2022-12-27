import { Typography } from "@mui/material";
import { FC } from "react";
import { CreateProblemForm } from "../modules/Problem/components/CreateProblemForm";

export const NewProblemPage: FC = () => {
  return (
    <>
      <Typography variant="h5"> New Problem </Typography>
      <CreateProblemForm />
    </>
  );
};
