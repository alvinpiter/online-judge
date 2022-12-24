import { AppError } from 'src/errors/AppError';

export class PutObjectError extends AppError {
  constructor(message: string) {
    super(PutObjectError.name, message);
  }
}
