import { ServerError } from '../../../errors/ServerError';

export class UsernameAndPasswordDoNotMatchError extends ServerError {
  static code = 'USERNAME_AND_PASSWORD_DO_NOT_MATCH_ERROR';

  constructor() {
    super(
      UsernameAndPasswordDoNotMatchError.code,
      'Username and Password do not match!',
    );
  }
}
