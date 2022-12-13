import { Typography, Button, Box } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { TextField } from "./forms/fields/TextField";

import { useBackendHealthCheckContextValue } from "./modules/BackendHealthCheck/contexts/context";
import { usePingRequest } from "./modules/BackendHealthCheck/hooks/usePingRequest";

interface FormData {
  firstName: string;
  lastName: string;
}

export const PageWithSimplePath: FC = () => {
  const { result, recheck } = useBackendHealthCheckContextValue();
  const {
    isLoading: isPingRequestLoading,
    result: pingResult,
    error: pingError,
    requestFunction: pingRequest,
  } = usePingRequest();

  return (
    <div>
      <h3> Page with simple path </h3>

      <Box>
        <Button variant="contained" onClick={() => recheck()}>
          Check backend health
        </Button>
        <Typography variant="body1" component="p">
          {result}
        </Typography>
      </Box>

      <Box marginTop={2}>
        <Formik<FormData>
          initialValues={{ firstName: "", lastName: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            const name = `${values.firstName} ${values.lastName}`;
            await pingRequest({ message: name });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextField name="firstName" placeholder="First name" />
              <TextField name="lastName" placeholder="Last name" />
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Ping backend
              </Button>
            </Form>
          )}
        </Formik>

        <Typography variant="body1" component="p">
          {isPingRequestLoading
            ? "Loading..."
            : pingError
            ? pingError.message
            : pingResult?.message}
        </Typography>
      </Box>
    </div>
  );
};
