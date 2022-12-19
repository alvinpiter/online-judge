import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCodeToHttpStatusMap } from './ErrorCodeToHttpStatusMap';
import { ServerError } from './ServerError';

const DEFAULT_ERROR_HTTP_STATUS = 422;

@Catch(ServerError, UnauthorizedException)
export class ServerErrorFilter implements ExceptionFilter {
  catch(error: ServerError | UnauthorizedException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let httpStatus: number;
    let code: string;
    let message: string;

    if (error instanceof ServerError) {
      httpStatus =
        ErrorCodeToHttpStatusMap[error.code] || DEFAULT_ERROR_HTTP_STATUS;

      code = error.code;
      message = error.message;
    } else {
      httpStatus = error.getStatus();
      code = error.name;
      message = error.message;
    }

    response.status(httpStatus).json({
      error: {
        code,
        message,
      },
    });
  }
}
