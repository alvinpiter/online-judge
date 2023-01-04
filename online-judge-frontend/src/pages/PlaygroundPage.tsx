import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { CodeEditorField } from "../forms/fields/CodeEditorField";
import { WysiwygEditorField } from "../forms/fields/WysiwygEditorField";

import * as Prism from "prismjs"; // https://stackoverflow.com/a/72559024
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import Editor from "react-simple-code-editor";

export const PlaygroundPage: FC = () => {
  return <CodeEditorDemo />;
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
          value={code}
          onValueChange={() => 0}
          highlight={(code) =>
            Prism.highlight(code, Prism.languages["js"], "js")
          }
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            border: "1px solid #F1F1F1",
          }}
        />
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
