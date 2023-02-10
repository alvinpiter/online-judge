import { MenuItem } from "@mui/material";
import { FC } from "react";
import {
  SelectField,
  SelectFieldProps,
} from "../../../../forms/fields/SelectField";
import { useGetProblemsRequest } from "../../../Problem/hooks/useGetProblemsRequest";
import { ProblemsOrderOption } from "../../../Problem/interfaces";

export const ProblemFilterField: FC<SelectFieldProps> = (props) => {
  // Get all problems
  const { isLoading: isLoadingProblems, result: getProblemsResult } =
    useGetProblemsRequest(42, 1, {}, ProblemsOrderOption.BY_ID_ASC);

  if (isLoadingProblems || !getProblemsResult) {
    return <p> Loading problems... </p>;
  }

  return (
    <SelectField {...props}>
      {getProblemsResult.data.map((problem) => (
        <MenuItem key={problem.id} value={problem.id}>
          {`${problem.id} - ${problem.name}`}
        </MenuItem>
      ))}
    </SelectField>
  );
};
