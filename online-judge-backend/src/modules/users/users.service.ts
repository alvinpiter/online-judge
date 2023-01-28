import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegistrationDto } from './data-transfer-objects/user-registration.dto';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

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

    return this.usersRepository.save(user);
  }
}
