import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { WysiwygEditorField } from "../forms/fields/WysiwygEditorField";
interface FormData {
  text: string;
}

export const PlaygroundPage: FC = () => {
  const [textAreaText, setTextAreaText] = useState("");

  return (
    <>
      <Formik<FormData>
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
