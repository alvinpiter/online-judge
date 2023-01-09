import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useField } from "formik";
import React, { FC } from "react";

interface SelectFieldProps {
  name: string;
  label?: string;
  children?: React.ReactNode;
}

export const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  children,
}) => {
  const [field, , helper] = useField<string>(name);

  const handleChange = (event: SelectChangeEvent) => {
    helper.setValue(event.target.value);
  };

  return (
    <Select label={label} value={field.value} onChange={handleChange}>
      {children}
    </Select>
  );
};
