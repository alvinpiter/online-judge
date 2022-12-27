import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC, useEffect } from "react";
import { FileField } from "../../../../forms/fields/FileField";
import { useAddTestCaseRequest } from "../../hooks/useAddTestCaseRequest";
import { ProblemTestCase } from "../../hooks/useGetTestCasesRequest";

interface AddTestCaseFormProps {
  problemId: string;
  onSuccess?: (problemTestCase: ProblemTestCase) => void;
}

interface AddTestCaseFormData {
  inputFile: File | null;
  outputFile: File | null;
}

export const AddTestCaseForm: FC<AddTestCaseFormProps> = ({
  problemId,
  onSuccess,
}) => {
  const {
    result: addTestCaseResult,
    error: addTestCaseError,
    requestFunction: addTestCaseRequest,
  } = useAddTestCaseRequest(problemId);

  const handleSubmit = async (values: AddTestCaseFormData) => {
    const formData = new FormData();
    formData.append("inputFile", values.inputFile!);
    formData.append("outputFile", values.outputFile!);

    await addTestCaseRequest(formData);
  };

  useEffect(() => {
    if (addTestCaseResult && onSuccess) {
      onSuccess(addTestCaseResult);
    }
  }, [addTestCaseResult, onSuccess]);

  useEffect(() => {
    if (addTestCaseError) {
      console.log(addTestCaseError);
    }
  }, [addTestCaseError]);

  return (
    <>
      <Formik<AddTestCaseFormData>
        initialValues={{
          inputFile: null,
          outputFile: null,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await handleSubmit(values);
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
