import { Box, Container, Typography } from "@mui/material";
import { FC } from "react";
import { SignInForm } from "../modules/Authentication/components/SignInForm";

export const SignInPage: FC = () => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Sign In</Typography>
        <Box>
          <SignInForm />
        </Box>
      </Box>
    </Container>
  );
};
