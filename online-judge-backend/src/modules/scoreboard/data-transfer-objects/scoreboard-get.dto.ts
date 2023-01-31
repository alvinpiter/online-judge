import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { OffsetPaginationDto } from 'src/modules/pagination/data-transfer-objects/offset-pagination.dto';

export class ScoreboardGetDto extends OffsetPaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  userId?: number;
}
