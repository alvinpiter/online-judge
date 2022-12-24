import { AppError } from '../../../errors/AppError';

export class UsernameAndPasswordDoNotMatchError extends AppError {
  constructor() {
    super(
      UsernameAndPasswordDoNotMatchError.name,
      'The username and the password do not match',
    );
  }
}
