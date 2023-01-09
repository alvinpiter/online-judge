import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { getAppErrorHttpStatus } from './helpers';
import { AppError } from './AppError';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    let httpStatus: number;
    let code: string;
    let message: string;

    switch (true) {
      case error instanceof AppError:
        httpStatus = getAppErrorHttpStatus(error);
        code = error.code;
        message = error.message;
        break;
      default:
        httpStatus = HttpStatus.BAD_REQUEST;
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
