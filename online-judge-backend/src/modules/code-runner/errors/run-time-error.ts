import { AppError } from '../../../errors/AppError';

export class RunTimeError extends AppError {
  constructor(message: string) {
    super(RunTimeError.name, message);
  }
}
