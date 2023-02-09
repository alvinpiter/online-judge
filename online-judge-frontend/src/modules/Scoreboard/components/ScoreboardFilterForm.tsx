import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { AutocompleteField } from "../../../forms/fields/AutocompleteField";
import { TextField } from "../../../forms/fields/TextField";
import { User } from "../../User/interface";
import { ScoreboardFilter } from "../interfaces";

interface ScoreboardFilterFormProps {
  initialFilter: ScoreboardFilter;
  onSubmit: (filter: ScoreboardFilter) => void;
}

interface ScoreboardFilterFormData {
  users: Pick<User, "id" | "username">[];
}

const TEMP_USERS: Pick<User, "id" | "username">[] = [
  { id: 1, username: "admin" },
  { id: 2, username: "user" },
];

export const ScoreboardFilterForm: FC<ScoreboardFilterFormProps> = ({
  initialFilter,
  onSubmit,
}) => {
  return (
    <Box>
      <Typography variant="h5"> Filters </Typography>
      <Formik<ScoreboardFilterFormData>
        initialValues={{
          users: [],
        }}
        onSubmit={(values) => {
          const userIds =
            values.users.length > 0
              ? values.users.map((u) => u.id).join(",")
              : undefined;

          onSubmit({ userIds });
        }}
      >
        {() => (
          <Form>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1"> Users </Typography>
              <AutocompleteField
                name="users"
                multiple
                options={TEMP_USERS}
                getOptionLabel={(option) => option.username}
                renderInput={(params) => (
                  <TextField {...params} label="Users" />
                )}
              />
            </Box>

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Filter
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
