import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { orderEntitiesById } from 'src/lib/orderEntitiesById';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getUsersByIds(ids: number[]) {
    const users = await this.usersRepository.find({
      where: { id: In(ids) },
    });

    return orderEntitiesById(ids, users);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
}
