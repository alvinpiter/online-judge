import { MenuItem } from "@mui/material";
import { FC } from "react";
import {
  SelectField,
  SelectFieldProps,
} from "../../../../forms/fields/SelectField";
import { useGetScoreboardProblemsRequest } from "../../../Scoreboard/hooks/useGetScoreboardProblemsRequest";

export const ProblemFilterField: FC<SelectFieldProps> = (props) => {
  const { isLoading: isLoadingProblems, result: problems } =
    useGetScoreboardProblemsRequest();

  if (isLoadingProblems || !problems) {
    return <p> Loading problems... </p>;
  }

  return (
    <SelectField {...props}>
      {problems.map((problem) => (
        <MenuItem key={problem.id} value={problem.id}>
          {`${problem.id} - ${problem.name}`}
        </MenuItem>
      ))}
    </SelectField>
  );
};
