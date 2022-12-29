import { Module } from '@nestjs/common';
import { OffsetPaginationService } from './offset-pagination.service';

@Module({
  providers: [OffsetPaginationService],
  exports: [OffsetPaginationService],
})
export class PaginationModule {}
