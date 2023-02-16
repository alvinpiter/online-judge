import { FC } from "react";
import { Autocomplete, AutocompleteProps } from "@mui/material";
import { useField } from "formik";

interface AutocompleteFieldProps extends AutocompleteProps<any, any, any, any> {
  name: string;
}

export const AutocompleteField: FC<AutocompleteFieldProps> = ({
  name,
  ...props
}) => {
  const [, , helper] = useField(name);

  const handleAutocompleteChange = (event: any, value: any) => {
    helper.setValue(value);
  };

  return (
    <Autocomplete {...props} size="small" onChange={handleAutocompleteChange} />
  );
};
