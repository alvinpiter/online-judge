import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import { FC } from "react";
import { CodeEditorField } from "../../../../forms/fields/CodeEditorField";
import { ProgrammingLanguage } from "../../interfaces";

interface SolutionTemplateFormProps {
  programmingLanguage: ProgrammingLanguage;
  initialTemplate: string;

  onSubmit: (
    programmingLanguage: ProgrammingLanguage,
    template: string
  ) => void;
}

interface SolutionTemplateFormData {
  template: string;
}

export const SolutionTemplateForm: FC<SolutionTemplateFormProps> = ({
  programmingLanguage,
  initialTemplate,
  onSubmit,
}) => {
  return (
    <>
      <Formik<SolutionTemplateFormData>
        enableReinitialize
        initialValues={{
          template: initialTemplate,
        }}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(programmingLanguage, values.template);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CodeEditorField
                name="template"
                programmingLanguage={programmingLanguage}
                height="50vh"
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};
