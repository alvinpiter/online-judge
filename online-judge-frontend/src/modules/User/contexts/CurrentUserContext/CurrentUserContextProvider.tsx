import { FC, ReactNode } from "react";
import { useCurrentUserRequest } from "../../hooks/useCurrentUserRequest";
import { CurrentUserContext } from "./context";

interface Props {
  children?: ReactNode;
}

export const CurrentUserContextProvider: FC<Props> = ({ children }) => {
  const {
    isLoading: isLoadingCurrentUser,
    result: currentUser,
    requestFunction: refreshCurrentUser,
  } = useCurrentUserRequest();

  return (
    <CurrentUserContext.Provider
      value={{
        isLoadingCurrentUser,
        currentUser,
        refreshCurrentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
