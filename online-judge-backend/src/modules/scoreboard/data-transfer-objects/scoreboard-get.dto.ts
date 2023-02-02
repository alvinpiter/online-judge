import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { unescape } from 'querystring';
import { OffsetPaginationDto } from 'src/modules/pagination/data-transfer-objects/offset-pagination.dto';

export class ScoreboardGetDto extends OffsetPaginationDto {
  @IsOptional()
  @Transform(({ value }) =>
    unescape(value as string)
      .split(',')
      .map((v) => parseInt(v.trim())),
  )
  @IsNumber({}, { each: true })
  userIds?: number[];
}
