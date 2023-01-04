import { FC } from "react";
import Editor from "@monaco-editor/react";
import { useField } from "formik";

interface CodeEditorFieldProps {
  name: string;
}

export const CodeEditorField: FC<CodeEditorFieldProps> = ({ name }) => {
  const [field, , helper] = useField(name);

  return (
    <Editor
      height="20vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      value={field.value}
      onChange={(value) => helper.setValue(value)}
      options={{
        minimap: {
          enabled: false,
        },
      }}
    />
  );
};
