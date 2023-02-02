import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { FC } from "react";
import { TextField } from "../../../forms/fields/TextField";
import { ScoreboardFilter } from "../interfaces";

interface ScoreboardFilterFormProps {
  initialFilter: ScoreboardFilter;
  onSubmit: (filter: ScoreboardFilter) => void;
}

interface ScoreboardFilterFormData {
  userIds?: string;
}

export const ScoreboardFilterForm: FC<ScoreboardFilterFormProps> = ({
  initialFilter,
  onSubmit,
}) => {
  return (
    <>
      <Formik<ScoreboardFilterFormData>
        initialValues={{
          userIds: initialFilter.userIds || "",
        }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {() => (
          <Form>
            <TextField name="userIds" label="userIds" margin="normal" />

            <Button type="submit" variant="contained" sx={{ ml: 2 }}>
              Filter
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
