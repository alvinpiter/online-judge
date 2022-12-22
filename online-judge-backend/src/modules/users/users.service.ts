import { Injectable } from '@nestjs/common';
import { UserEntity, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: Array<UserEntity>;

  constructor() {
    this.users = [
      new UserEntity('admin', 'password', UserRole.ADMIN),
      new UserEntity('user', 'password', UserRole.USER),
    ];
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
