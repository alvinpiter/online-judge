import { AppError } from 'src/errors/AppError';

export class ExpiredJobError extends AppError {
  constructor() {
    super(ExpiredJobError.name, 'The job is expired');
  }
}
