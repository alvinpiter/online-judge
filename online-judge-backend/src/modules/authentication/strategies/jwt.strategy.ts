import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigKey } from 'src/config';
import { UserEntity } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { JWTPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ConfigKey.JWT_SECRET_KEY),
    });
  }

  /*
  Passport will call this method with the decoded JWT as its parameter.
   */
  async validate(payload: JWTPayload): Promise<UserEntity> {
    return this.usersService.findByUsername(payload.username);
  }
}
