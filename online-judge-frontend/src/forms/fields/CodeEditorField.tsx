import { FC } from "react";
import Editor from "react-simple-code-editor";
import * as Prism from "prismjs"; // https://stackoverflow.com/a/72559024
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { useField } from "formik";

interface CodeEditorFieldProps {
  name: string;
}

export const CodeEditorField: FC<CodeEditorFieldProps> = ({ name }) => {
  const [field, , helper] = useField(name);

  return (
    <Editor
      value={field.value}
      onValueChange={(code) => helper.setValue(code)}
      highlight={(code) => Prism.highlight(code, Prism.languages["js"], "js")}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 16,
        border: "1px solid #F1F1F1",
      }}
    />
  );
};
