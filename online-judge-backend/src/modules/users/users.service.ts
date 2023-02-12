import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'src/lib/Observable';
import { orderEntitiesById } from 'src/lib/orderEntitiesById';
import { In, Repository } from 'typeorm';
import { UserRegistrationDto } from './data-transfer-objects/user-registration.dto';
import { User, UserRole } from './user.entity';

export interface UsersServiceEvent {
  userRegistered: (userId: number) => Promise<void>;
}

@Injectable()
export class UsersService extends Observable<UsersServiceEvent> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {
    super();
  }

  async getUsersByIds(ids: number[]) {
    const users = await this.usersRepository.find({
      where: { id: In(ids) },
    });

    return orderEntitiesById(ids, users);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOneByOrFail({ id });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async registerUser(userRegistrationDto: UserRegistrationDto): Promise<User> {
    const user = new User();
    user.username = userRegistrationDto.username;
    user.hashedPassword = userRegistrationDto.password;
    user.role = UserRole.USER;

    await this.usersRepository.save(user);
    this.publishEvent('userRegistered', (subscriber) => subscriber(user.id));

    return user;
  }
}
