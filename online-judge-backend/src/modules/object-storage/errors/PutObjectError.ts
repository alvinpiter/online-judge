import { ServerError } from 'src/errors/ServerError';

export class PutObjectError extends ServerError {
  static code = 'PUT_OBJECT_ERROR';

  constructor(message: string) {
    super(PutObjectError.code, message);
  }
}
