import { Autocomplete, debounce, TextField } from "@mui/material";
import axios from "axios";
import { useField } from "formik";
import { FC, useEffect, useMemo, useState } from "react";
import { config } from "../../../config";
import { User } from "../../User/interface";

/*
If `multiple` is set true, the corresponding formik field should be typed as User[].
If `multiple` is set false, the corresponding formik field should be typed as User | null
*/
interface UserSearchFieldProps {
  name: string;
  multiple?: boolean;
}

export const UserSearchField: FC<UserSearchFieldProps> = ({
  name,
  multiple,
}) => {
  const [singleField, , singleFieldHelper] = useField<User | null>(name);
  const [multipleField, , multipleFieldHelper] = useField<User[]>(name);

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<User[]>([]);

  const debouncedUserSearchSuggestionsRequest = useMemo(
    () =>
      debounce(async (usernamePrefix: string) => {
        try {
          const apiUrl = `${config.backendAPIURL}/user-search-suggestions?query=${usernamePrefix}`;
          const result = (await axios.get<User[]>(apiUrl)).data;
          setOptions(result);
        } catch {
          setOptions([]);
        }
      }, 400),
    []
  );

  useEffect(() => {
    debouncedUserSearchSuggestionsRequest(inputValue);
  }, [debouncedUserSearchSuggestionsRequest, inputValue]);

  return (
    <Autocomplete
      size="small"
      multiple={multiple}
      getOptionLabel={(option: User) => option.username}
      filterOptions={(user) => user}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={multiple ? multipleField.value : singleField.value}
      noOptionsText="User not found"
      onChange={(event: any, newValue: any) => {
        multiple
          ? multipleFieldHelper.setValue(newValue)
          : singleFieldHelper.setValue(newValue);
      }}
      onInputChange={(event: any, newInputValue: string) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} label="User" fullWidth />}
      renderOption={(props, option) => {
        const prefix = option.username.substring(0, inputValue.length);
        const suffix = option.username.substring(inputValue.length);

        return (
          <li {...props}>
            <strong>{prefix}</strong>
            {suffix}
          </li>
        );
      }}
    />
  );
};
