import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ConfigKey } from 'src/config';
import { UserEntity } from '../users/user.entity';
import { JWTPayload } from './interfaces';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(user: UserEntity) {
    const payload: JWTPayload = { username: user.username, role: user.role };

    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>(
        ConfigKey.ACCESS_TOKEN_EXPIRES_IN,
      ),
    });
  }
}
