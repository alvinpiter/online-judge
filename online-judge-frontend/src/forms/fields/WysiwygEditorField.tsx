import { ContentState, convertToRaw, EditorState } from "draft-js";
import { useField } from "formik";
import { FC, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

interface WysiwygEditorFieldProps {
  name: string;
}

export const WysiwygEditorField: FC<WysiwygEditorFieldProps> = ({ name }) => {
  const [field, , helper] = useField<string>(name);

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(htmlToDraft(field.value).contentBlocks)
    )
  );

  const handleEditorStateChange = (editorState: EditorState) => {
    helper.setValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  };

  return (
    <Editor
      editorStyle={{ border: "1px solid #F1F1F1" }}
      editorState={editorState}
      onEditorStateChange={handleEditorStateChange}
    />
  );
};
