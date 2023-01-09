import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import { FC } from "react";
import { CodeEditorField } from "../../../../../forms/fields/CodeEditorField";
import { ProgrammingLanguage } from "../../../interfaces";

interface UpsertSolutionTemplateFormProps {
  programmingLanguage: ProgrammingLanguage;
  initialTemplate: string;

  onSubmit: (
    programmingLanguage: ProgrammingLanguage,
    template: string
  ) => void;
}

interface UpsertSolutionTemplateFormData {
  template: string;
}

export const UpsertSolutionTemplateForm: FC<
  UpsertSolutionTemplateFormProps
> = ({ programmingLanguage, initialTemplate, onSubmit }) => {
  return (
    <>
      <Formik<UpsertSolutionTemplateFormData>
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
              />
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
