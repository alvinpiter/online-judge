import { Box, Container, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { SignInForm } from "../modules/Authentication/components/SignInForm";
import { useCurrentUserContext } from "../modules/User/contexts/CurrentUserContext";

export const SignInPage: FC = () => {
  const navigate = useNavigate();
  const { refreshCurrentUser } = useCurrentUserContext();

  const handleSuccessfulSignIn = () => {
    refreshCurrentUser();
    navigate(ROUTES.ROOT.generatePath());
  };

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
          <SignInForm onSuccessfulSignIn={handleSuccessfulSignIn} />
        </Box>
      </Box>
    </Container>
  );
};
