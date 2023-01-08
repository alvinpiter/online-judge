import { AppError } from 'src/errors/AppError';

export class JobMaxRetryCountReachedError extends AppError {
  constructor() {
    super(
      JobMaxRetryCountReachedError.name,
      "The job's max retry count has been reached",
    );
  }
}
