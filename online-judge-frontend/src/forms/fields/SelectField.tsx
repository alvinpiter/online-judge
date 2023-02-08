import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SelectProps } from "@mui/material/Select";
import { useField } from "formik";
import React, { FC } from "react";

interface SelectFieldProps extends SelectProps {
  name: string;
  children?: React.ReactNode;
}

export const SelectField: FC<SelectFieldProps> = ({
  name,
  children,
  ...props
}) => {
  const [field, , helper] = useField<string>(name);

  const handleChange = (event: SelectChangeEvent<any>) => {
    helper.setValue(event.target.value);
  };

  return (
    <Select {...props} value={field.value} onChange={handleChange} size="small">
      {children}
    </Select>
  );
};
