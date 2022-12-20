import { Typography, Button, Box, Container } from "@mui/material";
import { Form, Formik } from "formik";
import { FC, useEffect } from "react";
import { config } from "./config";
import { FileField } from "./forms/fields/FileField";
import { TextField } from "./forms/fields/TextField";
import { useHTTPPostRequest } from "../src/lib/hooks/useHTTPPostRequest";

interface UploadFileRequestResponse {
  fileName: string;
  fileUrl: string;
}

function useUploadFileRequest() {
  const apiUrl = `${config.backendAPIURL}/upload-file`;
  return useHTTPPostRequest<FormData, UploadFileRequestResponse>(apiUrl);
}

interface UploadFormData {
  fileName: string;
  file: File | null;
}

export const PageWithSimplePath: FC = () => {
  const { result, error, requestFunction: uploadFile } = useUploadFileRequest();

  const handleSubmit = async (values: UploadFormData) => {
    const formData = new FormData();
    formData.append("fileName", values.fileName);
    formData.append("file", values.file!);

    uploadFile(formData);
  };

  useEffect(() => {
    if (result) {
      console.log(result);
    }
  }, [result]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5"> File Upload </Typography>
        <Box>
          <Formik<UploadFormData>
            initialValues={{ fileName: "", file: null }}
            onSubmit={async (values, { setSubmitting }) => {
              await handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextField
                  type="text"
                  name="fileName"
                  label="File name"
                  required
                  fullWidth
                  margin="normal"
                />
                <FileField name="file" />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ mt: 2 }}
                >
                  Upload
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};
