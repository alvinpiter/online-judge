export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  username: string;
  role: UserRole;
}
