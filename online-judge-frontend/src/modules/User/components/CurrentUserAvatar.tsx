import {
  Avatar,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/Routes";
import { useSignOutRequest } from "../../Authentication/hooks/useSignOutRequest";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

export const CurrentUserAvatar: FC = () => {
  const navigate = useNavigate();

  const { isLoadingCurrentUser, currentUser, refreshCurrentUser } =
    useCurrentUserContext();

  const { result: signOutResult, requestFunction: signOutRequest } =
    useSignOutRequest();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    if (signOutResult) {
      refreshCurrentUser();
      navigate(ROUTES.HOME.generatePath());
    }
  }, [signOutResult, refreshCurrentUser, navigate]);

  if (isLoadingCurrentUser || !currentUser) {
    return null;
  }

  return (
    <>
      <IconButton onClick={openMenu}>
        <Avatar sx={{ width: 32, height: 32 }}>
          {currentUser.username[0].toUpperCase()}
        </Avatar>
        <Typography variant="body1" sx={{ marginLeft: 1 }} color="white">
          {currentUser.username}
        </Typography>
      </IconButton>
      <Menu
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClick={closeMenu}
        onClose={closeMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} href={ROUTES.HOME.generatePath()}>
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => signOutRequest({})}> Sign Out </MenuItem>
      </Menu>
    </>
  );
};
