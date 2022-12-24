import { FC } from "react";
import { Outlet } from "react-router-dom";
import { UserRole } from "../modules/User/interface";
import { ProtectedPage } from "./ProtectedPage";

export const AuthenticatedAdminPages: FC = () => {
  return (
    <ProtectedPage allowedRoles={[UserRole.ADMIN]}>
      <Outlet />
    </ProtectedPage>
  );
};
