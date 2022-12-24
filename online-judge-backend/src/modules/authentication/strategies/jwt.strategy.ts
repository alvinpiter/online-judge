import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigKey } from 'src/config';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ACCESS_TOKEN_KEY } from '../constants';
import { JWTPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: (request: Request) => {
        const jwtFromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        return jwtFromHeader || request.cookies[ACCESS_TOKEN_KEY];
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ConfigKey.JWT_SECRET_KEY),
    });
  }

  /*
  Passport will call this method with the decoded JWT as its parameter.
   */
  async validate(payload: JWTPayload): Promise<User> {
    return this.usersService.findByUsername(payload.username);
  }
}
