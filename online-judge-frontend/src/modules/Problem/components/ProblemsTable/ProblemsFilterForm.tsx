import { Button, MenuItem } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { SelectField } from "../../../../forms/fields/SelectField";
import { TextField } from "../../../../forms/fields/TextField";
import { ProblemsFilter, ProblemState } from "../../interfaces";

interface ProblemsFilterFormProps {
  initialFilter: ProblemsFilter;
  onSubmit: (filter: ProblemsFilter) => void;

  showStateField?: boolean;
}

interface ProblemsFilterFormData {
  state: ProblemState | "ALL";
  ratingGte: number;
  ratingLte: number;
}

export const ProblemsFilterForm: FC<ProblemsFilterFormProps> = ({
  initialFilter,
  onSubmit,
  showStateField,
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
      <Formik<ProblemsFilterFormData>
        initialValues={{
          state: initialFilter.state || "ALL",
          ratingGte: initialFilter.ratingGte || 0,
          ratingLte: initialFilter.ratingLte || 3000,
        }}
        onSubmit={(values) => {
          onSubmit({
            state: normalizeStateValue(values.state),
            ratingGte: values.ratingGte,
            ratingLte: values.ratingLte,
          });
        }}
      >
        {() => (
          <Form>
            {showStateField && (
              <SelectField label="State" name="state">
                <MenuItem value="ALL"> All </MenuItem>
                <MenuItem value={ProblemState.PUBLISHED}>
                  {ProblemState.PUBLISHED}
                </MenuItem>
                <MenuItem value={ProblemState.DRAFT}>
                  {ProblemState.DRAFT}
                </MenuItem>
              </SelectField>
            )}

            <TextField type="number" name="ratingGte" label="Min Rating" />

            <TextField type="number" name="ratingLte" label="Max Rating" />

            <Button type="submit" variant="contained" sx={{ ml: 2 }}>
              Filter
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
