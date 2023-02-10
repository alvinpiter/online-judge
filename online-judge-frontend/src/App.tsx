import AppBar from "@mui/material/AppBar";
import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ROUTES } from "./constants/Routes";
import { useCurrentUserContext } from "./modules/User/contexts/CurrentUserContext";
import { CurrentUserAvatar } from "./modules/User/components/CurrentUserAvatar";
import { UserRole } from "./modules/User/interface";
import { Gavel } from "@mui/icons-material";

const UserNavigations: Array<{ text: string; path: string }> = [
  { text: "Problems", path: ROUTES.USER_PROBLEMS_ROUTE.generatePath() },
  { text: "Submissions", path: ROUTES.SUBMISSIONS_ROUTE.generatePath() },
  { text: "Scoreboard", path: ROUTES.SCOREBOARD_ROUTE.generatePath() },
];

const AdminNavigations: Array<{ text: string; path: string }> = [
  { text: "Manage Problems", path: ROUTES.ADMIN_PROBLEMS_ROUTE.generatePath() },
];

function App() {
  const { isLoadingCurrentUser, currentUser } = useCurrentUserContext();
  const navigations =
    currentUser?.role === UserRole.ADMIN
      ? [...AdminNavigations, ...UserNavigations]
      : UserNavigations;

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Button
            variant="contained"
            disableElevation
            href={ROUTES.HOME.generatePath()}
            sx={{ color: "white", mr: 4 }}
            endIcon={<Gavel />}
          >
            <Typography variant="h6">Online Judge</Typography>
          </Button>

          <Box sx={{ flexGrow: 1 }}>
            <nav>
              {navigations?.map((navigation, idx) => (
                <Button
                  variant="contained"
                  disableElevation
                  href={navigation.path}
                  key={idx}
                >
                  {navigation.text}
                </Button>
              ))}
            </nav>
          </Box>
          {!isLoadingCurrentUser && currentUser ? (
            <CurrentUserAvatar />
          ) : (
            <Button
              variant="contained"
              disableElevation
              href={ROUTES.SIGN_IN_ROUTE.generatePath()}
              color="success"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ paddingTop: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default App;
