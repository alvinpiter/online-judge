import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsernameAndPasswordDoNotMatchError } from 'src/modules/authentication/errors/UsernameAndPasswordDoNotMatchError';
import { User } from 'src/modules/users/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  /*
  Passport will call this method with username and password value
  taken from the request body.

  If the username field has different name in the request body,
  we can specify it in the parent's constructor call above.
  For example: super({ usernameField: 'email' })
   */
  async validate(username: string, password: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user || user.hashedPassword !== password) {
      throw new UsernameAndPasswordDoNotMatchError();
    }

    return user;
  }
}
