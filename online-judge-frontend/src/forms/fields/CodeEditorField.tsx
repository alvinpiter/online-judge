import { FC } from "react";
import Editor from "@monaco-editor/react";
import { useField } from "formik";
import { ProgrammingLanguage } from "../../modules/Problem/interfaces";

interface CodeEditorFieldProps {
  name: string;
  programmingLanguage?: ProgrammingLanguage;
}

const PROGRAMMING_LANGUAGE_MAPPER = new Map<ProgrammingLanguage, string>([
  [ProgrammingLanguage.JAVASCRIPT, "javascript"],
  [ProgrammingLanguage.PYTHON_3, "python"],
  [ProgrammingLanguage.CPP_11, "cpp"],
]);

export const CodeEditorField: FC<CodeEditorFieldProps> = ({
  name,
  programmingLanguage,
}) => {
  const [field, , helper] = useField(name);

  return (
    <Editor
      height="20vh"
      theme="vs-dark"
      defaultLanguage="javascript"
      language={
        programmingLanguage &&
        PROGRAMMING_LANGUAGE_MAPPER.get(programmingLanguage)
      }
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
