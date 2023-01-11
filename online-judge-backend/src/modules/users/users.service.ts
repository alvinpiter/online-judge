import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getUser(userId: number) {
    return this.usersRepository.findOneByOrFail({ id: userId });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
}
