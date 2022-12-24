import { AppError } from '../../../errors/AppError';

export class UsernameNotFoundError extends AppError {
  constructor() {
    super(UsernameNotFoundError.name, 'The username is not registered yet');
  }
}
