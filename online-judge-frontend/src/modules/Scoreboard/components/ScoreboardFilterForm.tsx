import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { UserSearchField } from "../../Search/components/UserSearchField";
import { User } from "../../User/interface";
import { ScoreboardFilter } from "../interfaces";

interface ScoreboardFilterFormProps {
  initialFilter: ScoreboardFilter;
  onSubmit: (filter: ScoreboardFilter) => void;
}

interface ScoreboardFilterFormData {
  users: Pick<User, "id" | "username">[];
}

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
              <UserSearchField name="users" multiple />
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
