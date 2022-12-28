import { Alert, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/Routes";
import { TextField } from "../../../forms/fields/TextField";
import { useCreateProblemRequest } from "../Create/hooks/useCreateProblemRequest";

interface CreateProblemFormData {
  name: string;
  description: string;
}

export const CreateProblemForm: FC = () => {
  const {
    result: createProblemResult,
    error: createProblemError,
    requestFunction: createProblemRequest,
  } = useCreateProblemRequest();

  return (
    <Formik<CreateProblemFormData>
      initialValues={{ name: "", description: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        await createProblemRequest(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {createProblemResult && (
            <Alert>
              Problem is created! Navigate to{" "}
              <Link
                to={ROUTES.EDIT_PROBLEM_ROUTE.generatePath({
                  problemId: createProblemResult.id.toString(),
                })}
              >
                {" "}
                this link
              </Link>{" "}
              to add test cases for this problem.
            </Alert>
          )}

          {createProblemError && (
            <Alert severity="error"> {createProblemError.message} </Alert>
          )}

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
            Create Problem
          </Button>
        </Form>
      )}
    </Formik>
  );
};
