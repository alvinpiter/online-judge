import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { FileField } from "../../../../../forms/fields/FileField";

interface AddTestCaseFormProps {
  onSubmit: (formData: FormData) => void;
}

interface AddTestCaseFormData {
  inputFile: File | null;
  outputFile: File | null;
}

export const AddTestCaseForm: FC<AddTestCaseFormProps> = ({ onSubmit }) => {
  const handleSubmit = (values: AddTestCaseFormData) => {
    const formData = new FormData();
    formData.append("inputFile", values.inputFile!);
    formData.append("outputFile", values.outputFile!);

    onSubmit(formData);
  };

  return (
    <>
      <Formik<AddTestCaseFormData>
        initialValues={{
          inputFile: null,
          outputFile: null,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1"> Input file </Typography>
              <FileField name="inputFile" />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2"> Output file </Typography>
              <FileField name="outputFile" />
            </Box>

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              Add Test Case
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
