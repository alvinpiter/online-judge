export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: number;
  username: string;
  role: UserRole;
}
