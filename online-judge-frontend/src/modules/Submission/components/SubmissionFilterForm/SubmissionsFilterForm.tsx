import { Box, Button, MenuItem, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { SelectField } from "../../../../forms/fields/SelectField";
import {
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from "../../../Problem/interfaces";
import { UserSearchField } from "../../../Search/components/UserSearchField";
import { User } from "../../../User/interface";
import { SubmissionsFilter, SubmissionVerdict } from "../../interfaces";
import { FormattedProgrammingLanguage } from "../FormattedProgrammingLanguage/FormattedProgrammingLanguage";
import { ProblemFilterField } from "./ProblemFilterField";
import { SubmissionVerdictFilterField } from "./SubmissionVerdictFilterField";

interface SubmissionsFilterFormProps {
  initialFilter: SubmissionsFilter;
  onSubmit: (filter: SubmissionsFilter) => void;

  hideProblemFilter?: boolean;
  hideUserFilter?: boolean;
}

interface SubmissionsFilterFormData {
  user: User | null;
  problemId?: number;
  programmingLanguage: ProgrammingLanguage | "ALL";
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
    const { user, problemId, programmingLanguage, verdict } = values;
    return {
      userId: user?.id,
      problemId,
      programmingLanguage:
        programmingLanguage === "ALL" ? undefined : programmingLanguage,
      verdict: verdict || undefined,
    };
  };

  return (
    <Box>
      <Typography variant="h5"> Filters </Typography>
      <Formik<SubmissionsFilterFormData>
        initialValues={{
          user: null,
          problemId: initialFilter.problemId,
          programmingLanguage: initialFilter.programmingLanguage || "ALL",
          verdict: initialFilter.verdict || null,
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
          onSubmit(normalizeFormData(values));
        }}
      >
        {() => (
          <Form>
            {!hideProblemFilter && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">Problem</Typography>
                <ProblemFilterField
                  name="problemId"
                  label="Problem"
                  fullWidth
                />
              </Box>
            )}

            {!hideUserFilter && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1"> User </Typography>
                <UserSearchField name="user" />
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Typography variant="body1"> Programming Language </Typography>
              <SelectField
                name="programmingLanguage"
                label="Programming Language"
                fullWidth
              >
                <MenuItem value="ALL"> All </MenuItem>
                {SupportedProgrammingLanguages.map(
                  (programmingLanguage, idx) => (
                    <MenuItem key={idx} value={programmingLanguage}>
                      <FormattedProgrammingLanguage
                        programmingLanguage={programmingLanguage}
                      />
                    </MenuItem>
                  )
                )}
              </SelectField>
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
