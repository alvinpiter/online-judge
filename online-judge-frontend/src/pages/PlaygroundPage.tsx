import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React, { FC, useState } from "react";
import { CodeEditorField } from "../forms/fields/CodeEditorField";
import { WysiwygEditorField } from "../forms/fields/WysiwygEditorField";
import Editor from "@monaco-editor/react";
import { createContextAndUseContextHook } from "../lib/general/createContextAndUseContextHook";

export const PlaygroundPage: FC = () => {
  // return <CodeEditorDemo />;
  return <IntegerListContextProvider />;
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

interface DataListContextValue<T> {
  data: T[];
  addData: (newData: T) => void;
}

interface DataListProviderProps<T> {
  Context: React.Context<DataListContextValue<T> | undefined>;
  children?: React.ReactNode;
}

export const DataListContextProvider = <T,>(
  props: DataListProviderProps<T>
) => {
  const { Context, children } = props;

  const [data, setData] = useState<T[]>([]);
  const addData = (newData: T) => setData((oldData) => [...oldData, newData]);

  return (
    <Context.Provider value={{ data, addData }}>{children}</Context.Provider>
  );
};

type IntegerListContextValue = DataListContextValue<number>;

const [IntegerListContext, useIntegerListContext] =
  createContextAndUseContextHook<IntegerListContextValue>("IntegerListContext");

export const IntegerListContextProvider = () => {
  return (
    <DataListContextProvider Context={IntegerListContext}>
      <IntegerListContextConsumer />
    </DataListContextProvider>
  );
};

export const IntegerListContextConsumer: FC = () => {
  const { data, addData } = useIntegerListContext();

  console.log(data);

  const handleClick = () => {
    console.log("clicked");
    addData(Math.floor(Math.random() * 42));
  };

  return (
    <>
      {data.map((d) => (
        <Typography variant="body1"> {d} </Typography>
      ))}
      <Button onClick={handleClick}>Add data</Button>
    </>
  );
};
