import { AppError } from '../../../errors/AppError';

export class TimeLimitExceededError extends AppError {
  constructor() {
    super(TimeLimitExceededError.name, 'Time limit exceeded!');
  }
}
