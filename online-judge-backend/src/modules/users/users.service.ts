import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: Array<UserEntity>;

  constructor() {
    this.users = [new UserEntity('alvin', 'password')];
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
