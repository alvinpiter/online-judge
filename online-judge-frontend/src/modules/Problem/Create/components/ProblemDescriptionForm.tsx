import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { TextField } from "../../../../forms/fields/TextField";

interface ProblemDescriptionFormProps {
  onSubmit: (name: string, description: string) => void;
}

interface ProblemDescriptionFormData {
  name: string;
  description: string;
}

export const ProblemDescriptionForm: FC<ProblemDescriptionFormProps> = ({
  onSubmit,
}) => {
  return (
    <Formik<ProblemDescriptionFormData>
      enableReinitialize
      initialValues={{ name: "", description: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        onSubmit(values.name, values.description);
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
