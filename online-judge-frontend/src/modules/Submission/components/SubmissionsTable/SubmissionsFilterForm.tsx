import { Button, MenuItem } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { SelectField } from "../../../../forms/fields/SelectField";
import { TextField } from "../../../../forms/fields/TextField";
import {
  ProgrammingLanguage,
  SupportedProgrammingLanguages,
} from "../../../Problem/interfaces";
import { SubmissionsFilter, SubmissionVerdict } from "../../interfaces";

interface SubmissionsFilterFormProps {
  initialFilter: SubmissionsFilter;
  onSubmit: (filter: SubmissionsFilter) => void;
}

interface SubmissionsFilterFormData {
  userId?: number;
  problemId?: number;
  programmingLanguage: ProgrammingLanguage | "ALL";
  verdict: SubmissionVerdict | "ALL";
}

export const SubmissionsFilterForm: FC<SubmissionsFilterFormProps> = ({
  initialFilter,
  onSubmit,
}) => {
  const normalizeFormData = (
    values: SubmissionsFilterFormData
  ): SubmissionsFilter => {
    const { userId, problemId, programmingLanguage, verdict } = values;
    return {
      userId,
      problemId,
      programmingLanguage:
        programmingLanguage === "ALL" ? undefined : programmingLanguage,
      verdict: verdict === "ALL" ? undefined : verdict,
    };
  };

  return (
    <>
      <Formik<SubmissionsFilterFormData>
        initialValues={{
          userId: initialFilter.userId,
          problemId: initialFilter.problemId,
          programmingLanguage: initialFilter.programmingLanguage || "ALL",
          verdict: initialFilter.verdict || "ALL",
        }}
        onSubmit={(values) => {
          onSubmit(normalizeFormData(values));
        }}
      >
        {() => (
          <Form>
            <TextField type="number" name="problemId" label="Problem ID" />
            <TextField type="number" name="userId" label="User ID" />

            <SelectField
              name="programmingLanguage"
              label="Programming Language"
            >
              <MenuItem value="ALL"> All </MenuItem>
              {SupportedProgrammingLanguages.map((programmingLanguage, idx) => (
                <MenuItem key={idx} value={programmingLanguage}>
                  {programmingLanguage}
                </MenuItem>
              ))}
            </SelectField>

            <SelectField name="verdict" label="Verdict">
              <MenuItem value="ALL"> All </MenuItem>
              {Object.keys(SubmissionVerdict).map((verdict, idx) => (
                <MenuItem key={idx} value={verdict}>
                  {verdict}
                </MenuItem>
              ))}
            </SelectField>

            <Button type="submit" variant="contained" sx={{ ml: 2 }}>
              Filter
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
