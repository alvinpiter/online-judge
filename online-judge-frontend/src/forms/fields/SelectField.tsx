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
  label,
  fullWidth,
  children,
}) => {
  const [field, , helper] = useField<string>(name);

  const handleChange = (event: SelectChangeEvent) => {
    helper.setValue(event.target.value);
  };

  return (
    <Select
      label={label}
      value={field.value}
      fullWidth={fullWidth}
      onChange={handleChange}
      size="small"
    >
      {children}
    </Select>
  );
};
