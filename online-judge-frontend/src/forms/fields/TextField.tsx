import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { Field } from "formik";
import { FC } from "react";

export const TextField: FC<TextFieldProps> = (props) => {
  return <Field as={MuiTextField} {...props}></Field>;
};
