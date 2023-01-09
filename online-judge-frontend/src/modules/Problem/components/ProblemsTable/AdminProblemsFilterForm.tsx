import { Button, MenuItem } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { SelectField } from "../../../../forms/fields/SelectField";
import { AdminProblemsFilter, ProblemState } from "../../interfaces";

interface AdminProblemsFilterFormProps {
  initialFilter: AdminProblemsFilter;
  onSubmit: (filter: AdminProblemsFilter) => void;
}

interface AdminProblemsFilterFormData {
  state: ProblemState | "ALL";
}

export const AdminProblemsFilterForm: FC<AdminProblemsFilterFormProps> = ({
  initialFilter,
  onSubmit,
}) => {
  const normalizeStateValue = (state: ProblemState | "ALL") => {
    if (state === "ALL") {
      return undefined;
    } else {
      return state;
    }
  };

  return (
    <>
      <Formik<AdminProblemsFilterFormData>
        initialValues={{
          state: initialFilter.state || "ALL",
        }}
        onSubmit={(values) => {
          onSubmit({
            state: normalizeStateValue(values.state),
          });
        }}
      >
        {() => (
          <Form>
            <SelectField label="State" name="state">
              <MenuItem value="ALL"> All </MenuItem>
              <MenuItem value={ProblemState.PUBLISHED}>
                {ProblemState.PUBLISHED}
              </MenuItem>
              <MenuItem value={ProblemState.DRAFT}>
                {ProblemState.DRAFT}
              </MenuItem>
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
