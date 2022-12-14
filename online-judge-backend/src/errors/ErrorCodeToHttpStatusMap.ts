import { HttpStatus } from '@nestjs/common';
import { UsernameAndPasswordDoNotMatchError } from './UsernameAndPasswordDoNotMatchError';

export const ErrorCodeToHttpStatusMap: Record<string, HttpStatus> = {
  [UsernameAndPasswordDoNotMatchError.code]: HttpStatus.UNAUTHORIZED,
};
