import { HttpStatus } from '@nestjs/common';
import { UsernameAndPasswordDoNotMatchError } from '../modules/authentication/errors/UsernameAndPasswordDoNotMatchError';

export const ErrorCodeToHttpStatusMap: Record<string, HttpStatus> = {
  [UsernameAndPasswordDoNotMatchError.code]: HttpStatus.UNAUTHORIZED,
};
