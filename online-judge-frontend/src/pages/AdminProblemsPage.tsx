import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { ROUTES } from "../constants/Routes";

export const AdminProblemsPage: FC = () => {
  return (
    <>
      <Typography variant="h4">Admin Problems</Typography>
      <Button
        variant="contained"
        href={ROUTES.NEW_PROBLEM_ROUTE.generatePath()}
      >
        New Problem
      </Button>
    </>
  );
};
