import { TextField } from "@mui/material";
import { FC } from "react";
import { AutocompleteField } from "../../../../forms/fields/AutocompleteField";
import { LoadingState } from "../../../../lib/components/LoadingState";
import { useGetProblemsRequest } from "../../../Problem/hooks/useGetProblemsRequest";
import { Problem, ProblemsOrderOption } from "../../../Problem/interfaces";

interface ProblemFilterFieldProps {
  name: string;
}

export const ProblemFilterField: FC<ProblemFilterFieldProps> = ({ name }) => {
  // Get all problems
  const { isLoading: isLoadingProblems, result: getProblemsResult } =
    useGetProblemsRequest(42, 1, {}, ProblemsOrderOption.BY_ID_ASC);

  if (isLoadingProblems) {
    return <LoadingState />;
  }

  if (!getProblemsResult) {
    return null;
  }

  return (
    <AutocompleteField
      name={name}
      options={getProblemsResult.data}
      getOptionLabel={(option: Problem) => option.name}
      renderInput={(params) => <TextField {...params} label="Problem" />}
    />
  );
};
