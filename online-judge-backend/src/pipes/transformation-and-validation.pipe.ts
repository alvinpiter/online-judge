import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AppError } from 'src/errors/AppError';

export class TransformationAndValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }

    const object = plainToInstance(metatype, value);

    const validationErrors = await validate(object);
    if (validationErrors.length > 0) {
      throw new AppError('VALIDATION_ERROR', validationErrors[0].toString());
    }

    return object;
  }
}
