import { ServerError } from 'src/errors/ServerError';

export class DeleteObjectError extends ServerError {
  static code = 'DELETE_OBJECT_ERROR';

  constructor(message: string) {
    super(DeleteObjectError.code, message);
  }
}
