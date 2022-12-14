import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ErrorCodeToHttpStatusMap } from './ErrorCodeToHttpStatusMap';
import { ServerError } from './ServerError';

const DEFAULT_ERROR_HTTP_STATUS = 422;

@Catch(ServerError)
export class ServerErrorFilter implements ExceptionFilter {
  catch(error: ServerError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const httpStatus =
      ErrorCodeToHttpStatusMap[error.code] || DEFAULT_ERROR_HTTP_STATUS;

    response.status(httpStatus).json({
      error: {
        code: error.code,
        message: error.message,
      },
    });
  }
}
