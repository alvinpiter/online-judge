import { User } from "../../interface";

export interface CurrentUserContextValue {
  isLoadingCurrentUser: boolean;
  currentUser: User | undefined;
  refreshCurrentUser: () => Promise<void>;
}
