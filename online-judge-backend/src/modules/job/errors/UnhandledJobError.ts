import { AppError } from 'src/errors/AppError';

export class UnhandledJobError extends AppError {
  constructor(jobName: string) {
    super(UnhandledJobError.name, `No handler found for job ${jobName}`);
  }
}
