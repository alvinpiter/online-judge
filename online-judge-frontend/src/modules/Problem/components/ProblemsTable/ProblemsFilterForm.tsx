import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { AutocompleteField } from "../../../../forms/fields/AutocompleteField";
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
  state: ProblemState | null;
  ratingGte: number;
  ratingLte: number;
}

export const ProblemsFilterForm: FC<ProblemsFilterFormProps> = ({
  initialFilter,
  onSubmit,
  showStateField,
}) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5"> Filters </Typography>
      <Formik<ProblemsFilterFormData>
        initialValues={{
          state: initialFilter.state || null,
          ratingGte: initialFilter.ratingGte || MIN_PROBLEM_RATING,
          ratingLte: initialFilter.ratingLte || MAX_PROBLEM_RATING,
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(initialFilter));
          onSubmit({
            state: values.state || undefined,
            ratingGte: values.ratingGte,
            ratingLte: values.ratingLte,
          });
        }}
      >
        {() => (
          <Form>
            {showStateField && (
              <Box sx={{ mt: 2 }}>
                <AutocompleteField
                  name="state"
                  options={Object.keys(ProblemState)}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField {...params} label="Problem state" />
                  )}
                />
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <TextField
                type="number"
                name="ratingGte"
                label="Minimum Rating"
                fullWidth
              />
            </Box>

            <Box sx={{ mt: 2 }}>
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
