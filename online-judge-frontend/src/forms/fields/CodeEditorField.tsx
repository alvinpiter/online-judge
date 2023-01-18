import { FC } from "react";
import Editor from "@monaco-editor/react";
import { useField } from "formik";
import { ProgrammingLanguage } from "../../modules/Problem/interfaces";
import { CODE_EDITOR_PROGRAMMING_LANGUAGE_MAPPER } from "../../constants/CodeEditorProgrammingLanguageMapper";

interface CodeEditorFieldProps {
  name: string;
  programmingLanguage?: ProgrammingLanguage;
}

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
        CODE_EDITOR_PROGRAMMING_LANGUAGE_MAPPER.get(programmingLanguage)
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
