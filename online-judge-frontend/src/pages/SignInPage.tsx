import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { SignInForm } from "../modules/Authentication/components/SignInForm";
import { SEOTitle } from "../modules/SEO/components/SEOTitle";
import { useCurrentUserContext } from "../modules/User/contexts/CurrentUserContext";

export const SignInPage: FC = () => {
  const navigate = useNavigate();
  const { refreshCurrentUser } = useCurrentUserContext();

  const handleSuccessfulSignIn = () => {
    refreshCurrentUser();
    navigate(ROUTES.HOME.generatePath());
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SEOTitle title="Sign In" />
      <Typography variant="h5">Sign In</Typography>
      <Box>
        <SignInForm onSuccessfulSignIn={handleSuccessfulSignIn} />
      </Box>
    </Box>
  );
};
