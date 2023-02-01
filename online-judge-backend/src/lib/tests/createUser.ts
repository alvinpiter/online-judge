import { User, UserRole } from 'src/modules/users/user.entity';

export function createUser(
  id: number,
  username = 'Username',
  role = UserRole.USER,
) {
  const user = new User();
  user.id = id;
  user.username = username;
  user.role = role;

  return user;
}
