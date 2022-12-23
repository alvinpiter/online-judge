import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsernameAndPasswordDoNotMatchError } from '../authentication/errors/UsernameAndPasswordDoNotMatchError';
import { UsernameNotFoundError } from '../authentication/errors/UsernameNotFoundError';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async validateUserCredential(
    username: string,
    hashedPassword: string,
  ): Promise<User> {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new UsernameNotFoundError();
    }

    if (!user.isCorrectHashedPassword(hashedPassword)) {
      throw new UsernameAndPasswordDoNotMatchError();
    }

    return user;
  }
}
