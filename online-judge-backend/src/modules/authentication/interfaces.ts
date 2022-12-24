import { UserRole } from '../users/user.entity';

export interface JWTPayload {
  username: string;
  role: UserRole;
}
