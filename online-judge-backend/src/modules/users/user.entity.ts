export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class UserEntity {
  constructor(
    public username: string,
    public password: string,
    public role = UserRole.USER,
  ) {}
}
