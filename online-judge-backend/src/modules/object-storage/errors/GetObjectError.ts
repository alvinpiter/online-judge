import { ServerError } from 'src/errors/ServerError';

export class GetObjectError extends ServerError {
  static code = 'GET_OBJECT_ERROR';

  constructor(message: string) {
    super(GetObjectError.code, message);
  }
}
