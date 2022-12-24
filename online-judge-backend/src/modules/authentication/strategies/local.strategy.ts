import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/modules/users/user.entity';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
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
    return this.authenticationService.validateUserCredential(
      username,
      password,
    );
  }
}
