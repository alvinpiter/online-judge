import { Box, Button, MenuItem, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { SelectField } from "../../../../forms/fields/SelectField";
import { TextField } from "../../../../forms/fields/TextField";
import {
  MAX_PROBLEM_RATING,
  MIN_PROBLEM_RATING,
  ProblemsFilter,
  ProblemState,
} from "../../interfaces";

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
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5"> Filters </Typography>
      <Formik<ProblemsFilterFormData>
        initialValues={{
          state: initialFilter.state || "ALL",
          ratingGte: initialFilter.ratingGte || MIN_PROBLEM_RATING,
          ratingLte: initialFilter.ratingLte || MAX_PROBLEM_RATING,
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
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1"> Problem state </Typography>
                <SelectField label="State" name="state" fullWidth>
                  <MenuItem value="ALL"> All </MenuItem>
                  <MenuItem value={ProblemState.PUBLISHED}>
                    {ProblemState.PUBLISHED}
                  </MenuItem>
                  <MenuItem value={ProblemState.DRAFT}>
                    {ProblemState.DRAFT}
                  </MenuItem>
                </SelectField>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Typography variant="body1"> Minimum rating </Typography>
              <TextField
                type="number"
                name="ratingGte"
                label="Minimum Rating"
                fullWidth
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body1"> Maximum rating </Typography>
              <TextField
                type="number"
                name="ratingLte"
                label="Maximum Rating"
                fullWidth
              />
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
