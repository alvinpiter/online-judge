import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import { FC, useEffect } from "react";
import { TextField } from "../../../../forms/fields/TextField";
import { useUpsertSolutionTemplateRequest } from "../../hooks/useUpsertSolutionTemplateRequest";
import { ProblemSolutionTemplate, ProgrammingLanguage } from "../../interfaces";

interface UpsertSolutionTemplateFormProps {
  problemId: string;
  programmingLanguage: ProgrammingLanguage;
  initialTemplate: string;

  onSuccess?: (problemSolutionTemplate: ProblemSolutionTemplate) => void;
}

interface UpsertSolutionTemplateFormData {
  template: string;
}

export const UpsertSolutionTemplateForm: FC<
  UpsertSolutionTemplateFormProps
> = ({ problemId, programmingLanguage, initialTemplate, onSuccess }) => {
  const {
    result: problemSolutionTemplate,
    requestFunction: upsertSolutionTemplateRequest,
  } = useUpsertSolutionTemplateRequest(problemId);

  useEffect(() => {
    if (problemSolutionTemplate) {
      onSuccess && onSuccess(problemSolutionTemplate);
    }
  }, [problemSolutionTemplate, onSuccess]);

  return (
    <>
      <Formik<UpsertSolutionTemplateFormData>
        enableReinitialize
        initialValues={{
          template: initialTemplate,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await upsertSolutionTemplateRequest({
            programmingLanguage,
            template: values.template,
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField margin="normal" name="template" label="Template" />
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                Update Solution Template
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};
