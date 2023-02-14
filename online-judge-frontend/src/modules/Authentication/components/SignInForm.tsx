import { Alert, Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
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
        await signInRequest(values);
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
            <Box sx={{ mt: 2 }}>
              <LoadingState />
            </Box>
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
