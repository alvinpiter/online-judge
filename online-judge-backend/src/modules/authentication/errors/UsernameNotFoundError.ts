import { ServerError } from '../../../errors/ServerError';

export class UsernameNotFoundError extends ServerError {
  static code = 'USERNAME_NOT_FOUND_ERROR';

  constructor() {
    super(UsernameNotFoundError.code, 'The username is not registered yet');
  }
}
