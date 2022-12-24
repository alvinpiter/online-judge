import { HttpStatus } from '@nestjs/common';
import { UsernameAndPasswordDoNotMatchError } from '../modules/authentication/errors/UsernameAndPasswordDoNotMatchError';
import { AppError } from './AppError';

export function getAppErrorHttpStatus(error: AppError): HttpStatus {
  switch (error.constructor) {
    case UsernameAndPasswordDoNotMatchError:
      return HttpStatus.UNAUTHORIZED;
    default:
      return HttpStatus.UNPROCESSABLE_ENTITY;
  }
}
