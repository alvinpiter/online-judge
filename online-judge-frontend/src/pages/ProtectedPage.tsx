import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { LoadingState } from "../lib/components/LoadingState";
import { useCurrentUserContext } from "../modules/User/contexts/CurrentUserContext";
import { UserRole } from "../modules/User/interface";

interface ProtectedPageProps {
  allowedRoles?: Array<UserRole>;
  children?: React.ReactNode;
}

export const ProtectedPage: FC<ProtectedPageProps> = ({
  allowedRoles,
  children,
}) => {
  const navigate = useNavigate();
  const { isLoadingCurrentUser, currentUser } = useCurrentUserContext();

  useEffect(() => {
    if (isLoadingCurrentUser) {
      return;
    }

    if (!currentUser) {
      navigate(ROUTES.SIGN_IN_ROUTE.generatePath());
      return;
    }

    if (!allowedRoles || !allowedRoles.includes(currentUser.role)) {
      navigate(ROUTES.HOME.generatePath());
    }
  }, [isLoadingCurrentUser, currentUser, allowedRoles, navigate]);

  if (isLoadingCurrentUser) {
    return <LoadingState />;
  }

  return <>{children}</>;
};
