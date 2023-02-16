import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { Problem, ProgrammingLanguage } from "../../../Problem/interfaces";
import { UserSearchField } from "../../../Search/components/UserSearchField";
import { User } from "../../../User/interface";
import { SubmissionsFilter, SubmissionVerdict } from "../../interfaces";
import { ProblemFilterField } from "./ProblemFilterField";
import { SubmissionProgrammingLanguageFilterField } from "./SubmissionProgrammingLanguageFilterField";
import { SubmissionVerdictFilterField } from "./SubmissionVerdictFilterField";

interface SubmissionsFilterFormProps {
  initialFilter: SubmissionsFilter;
  onSubmit: (filter: SubmissionsFilter) => void;

  hideProblemFilter?: boolean;
  hideUserFilter?: boolean;
}

interface SubmissionsFilterFormData {
  user: User | null;
  problem: Problem | null;
  programmingLanguage: ProgrammingLanguage | null;
  verdict: SubmissionVerdict | null;
}

export const SubmissionsFilterForm: FC<SubmissionsFilterFormProps> = ({
  initialFilter,
  onSubmit,
  hideProblemFilter,
  hideUserFilter,
}) => {
  const normalizeFormData = (
    values: SubmissionsFilterFormData
  ): SubmissionsFilter => {
    const { user, problem, programmingLanguage, verdict } = values;
    return {
      userId: user?.id,
      problemId: problem?.id,
      programmingLanguage: programmingLanguage || undefined,
      verdict: verdict || undefined,
    };
  };

  return (
    <Box>
      <Typography variant="h5"> Filters </Typography>
      <Formik<SubmissionsFilterFormData>
        initialValues={{
          user: null,
          problem: null,
          programmingLanguage: initialFilter.programmingLanguage || null,
          verdict: initialFilter.verdict || null,
        }}
        onSubmit={(values) => {
          onSubmit(normalizeFormData(values));
        }}
      >
        {() => (
          <Form>
            {!hideProblemFilter && (
              <Box sx={{ mt: 2 }}>
                <ProblemFilterField name="problem" />
              </Box>
            )}

            {!hideUserFilter && (
              <Box sx={{ mt: 2 }}>
                <UserSearchField name="user" label="User" />
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <SubmissionProgrammingLanguageFilterField name="programmingLanguage" />
            </Box>

            <Box sx={{ mt: 2 }}>
              <SubmissionVerdictFilterField name="verdict" />
            </Box>

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Filter
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
