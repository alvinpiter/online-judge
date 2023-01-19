import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { CodeEditorField } from "../forms/fields/CodeEditorField";
import { WysiwygEditorField } from "../forms/fields/WysiwygEditorField";
import Editor from "@monaco-editor/react";
import { useGetGlobalStatisticsRequest } from "../modules/Statistics/hooks/useGetGlobalStatisticsRequest";

export const PlaygroundPage: FC = () => {
  const { result: globalStatistics } = useGetGlobalStatisticsRequest();

  if (!globalStatistics) {
    return null;
  }

  return (
    <>
      <Typography variant="h5">
        Number of users: {globalStatistics.numberOfUsers}{" "}
      </Typography>
      <Typography variant="h5">
        Number of problems: {globalStatistics.numberOfProblems}{" "}
      </Typography>
      <Typography variant="h5">
        Number of submissions: {globalStatistics.numberOfSubmissions}{" "}
      </Typography>
    </>
  );
};

interface CodeEditorFormData {
  code: string;
}

export const CodeEditorDemo = () => {
  const [code, setCode] = useState("");

  return (
    <>
      <Formik<CodeEditorFormData>
        initialValues={{ code }}
        onSubmit={(values) => setCode(values.code)}
      >
        {() => (
          <Form>
            <CodeEditorField name="code" />
            <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h5"> Result </Typography>
        <Editor
          height="20vh"
          theme="vs-dark"
          defaultLanguage="javascript"
          value={code}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h5"> Raw result </Typography>
        <textarea value={code} readOnly style={{ width: "100%" }} />
      </Box>
    </>
  );
};

interface WysiwygDemoFormData {
  text: string;
}

export const WysiwygEditorDemo = () => {
  const [textAreaText, setTextAreaText] = useState("");

  return (
    <>
      <Formik<WysiwygDemoFormData>
        initialValues={{
          text: "",
        }}
        onSubmit={(values) => setTextAreaText(values.text)}
      >
        {() => (
          <Form>
            <WysiwygEditorField name="text" />
            <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
              Parse
            </Button>
          </Form>
        )}
      </Formik>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h5"> Raw HTML </Typography>
        <textarea value={textAreaText} readOnly style={{ width: "100%" }} />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h5"> Rendered HTML </Typography>
        <div
          dangerouslySetInnerHTML={{ __html: textAreaText }}
          style={{ border: "1px solid black" }}
        />
      </Box>
    </>
  );
};
