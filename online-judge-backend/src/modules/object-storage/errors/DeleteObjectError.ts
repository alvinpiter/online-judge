import { AppError } from 'src/errors/AppError';

export class DeleteObjectError extends AppError {
  constructor(message: string) {
    super(DeleteObjectError.name, message);
  }
}
