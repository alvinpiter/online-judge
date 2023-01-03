import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { TextField } from "../../../../forms/fields/TextField";

interface ProblemDescriptionFormProps {
  initialName?: string;
  initialDescription?: string;
  initialRating?: number;

  onSubmit: (name: string, description: string, rating: number) => void;
}

interface ProblemDescriptionFormData {
  name: string;
  description: string;
  rating: number;
}

export const ProblemDescriptionForm: FC<ProblemDescriptionFormProps> = ({
  initialName,
  initialDescription,
  initialRating,
  onSubmit,
}) => {
  const resolvedName = initialName || "";
  const resolvedDescription = initialDescription || "";
  const resolvedRating = initialRating || 0;

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
          <TextField
            name="description"
            label="Description"
            required
            fullWidth
            margin="normal"
          />
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
