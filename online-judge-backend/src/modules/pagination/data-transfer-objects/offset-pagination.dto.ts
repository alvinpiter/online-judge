import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class OffsetPaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  offset?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit?: number;
}
