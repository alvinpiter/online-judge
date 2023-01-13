import { AppError } from '../../../errors/AppError';

export class CompilationError extends AppError {
  constructor(message: string) {
    super(CompilationError.name, message);
  }
}
