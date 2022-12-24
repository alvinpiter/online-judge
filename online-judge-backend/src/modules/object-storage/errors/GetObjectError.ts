import { AppError } from 'src/errors/AppError';

export class GetObjectError extends AppError {
  constructor(message: string) {
    super(GetObjectError.name, message);
  }
}
