import { Alert, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { FC, useEffect } from "react";

import { TextField } from "../../../forms/fields/TextField";
import { useSignInRequest } from "../hooks/useSignInRequest";

interface SignInFormData {
  username: string;
  password: string;
}

export const SignInForm: FC = () => {
  const {
    result: signInResult,
    error: signInError,
    requestFunction: signInRequest,
  } = useSignInRequest();

  const handleSubmit = async (formData: SignInFormData) => {
    await signInRequest(formData);
  };

  useEffect(() => {
    if (signInResult) {
      console.log(`Sign in success! JWT: ${signInResult.jwt}`);
    }
  }, [signInResult]);

  return (
    <Formik<SignInFormData>
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        handleSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {signInError && <Alert severity="error">{signInError.message}</Alert>}
          <TextField
            type="text"
            name="username"
            label="Username"
            required
            fullWidth
            margin="normal"
          />
          <TextField
            type="password"
            name="password"
            label="Password"
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
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
};
