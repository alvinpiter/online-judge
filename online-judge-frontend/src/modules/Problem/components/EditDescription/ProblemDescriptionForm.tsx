import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { TextField } from "../../../../forms/fields/TextField";
import { WysiwygEditorField } from "../../../../forms/fields/WysiwygEditorField";
import { Problem } from "../../interfaces";

interface ProblemDescriptionFormProps {
  problem?: Problem;
  onSubmit: (name: string, description: string, rating: number) => void;
}

interface ProblemDescriptionFormData {
  name: string;
  description: string;
  rating: number;
}

export const ProblemDescriptionForm: FC<ProblemDescriptionFormProps> = ({
  problem,
  onSubmit,
}) => {
  const resolvedName = problem?.name || "";
  const resolvedDescription = problem?.description || "";
  const resolvedRating = problem?.rating || 0;

  return (
    <Formik<ProblemDescriptionFormData>
      enableReinitialize
      initialValues={{
        name: resolvedName,
        description: resolvedDescription,
        rating: resolvedRating,
      }}
      onSubmit={async (values, { setSubmitting }) => {
        onSubmit(values.name, values.description, values.rating);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextField
            name="name"
            label="Name"
            required
            fullWidth
            margin="normal"
          />
          <WysiwygEditorField name="description" />
          <TextField
            type="number"
            name="rating"
            label="Rating"
            required
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
