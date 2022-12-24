import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { UsernameAndPasswordDoNotMatchError } from './errors/UsernameAndPasswordDoNotMatchError';
import { UsernameNotFoundError } from './errors/UsernameNotFoundError';
import { JWTPayload } from './interfaces';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserCredential(
    username: string,
    hashedPassword: string,
  ): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UsernameNotFoundError();
    }

    if (!user.isCorrectHashedPassword(hashedPassword)) {
      throw new UsernameAndPasswordDoNotMatchError();
    }

    return user;
  }

  async generateAccessToken(user: User) {
    const payload: JWTPayload = { username: user.username, role: user.role };

    return this.jwtService.sign(payload);
  }
}
