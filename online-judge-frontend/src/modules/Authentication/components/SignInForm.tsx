import { Alert, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { sha256 } from "js-sha256";
import { FC, useEffect } from "react";

import { TextField } from "../../../forms/fields/TextField";
import { LoadingState } from "../../../lib/components/LoadingState";
import { useSignInRequest } from "../hooks/useSignInRequest";

interface SignInFormProps {
  onSuccessfulSignIn?: () => void;
}

interface SignInFormData {
  username: string;
  password: string;
}

export const SignInForm: FC<SignInFormProps> = ({ onSuccessfulSignIn }) => {
  const {
    result: signInResult,
    error: signInError,
    requestFunction: signInRequest,
  } = useSignInRequest();

  useEffect(() => {
    if (signInResult) {
      onSuccessfulSignIn && onSuccessfulSignIn();
    }
  }, [signInResult, onSuccessfulSignIn]);

  return (
    <Formik<SignInFormData>
      initialValues={{ username: "", password: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        await signInRequest({
          username: values.username,
          password: sha256(values.password),
        });

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

          {isSubmitting ? (
            <LoadingState />
          ) : (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};
