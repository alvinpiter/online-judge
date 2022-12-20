import { useField } from "formik";
import { ChangeEvent, FC } from "react";

interface FileFieldProps {
  name: string;
}

export const FileField: FC<FileFieldProps> = ({ name }) => {
  const [, , helper] = useField<File | null>(name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      helper.setValue(event.target.files[0]);
    }
  };

  return <input name={name} type="file" onChange={handleChange} />;
};
