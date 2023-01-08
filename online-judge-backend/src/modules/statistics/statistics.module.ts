import { Module } from '@nestjs/common';
import { SubmissionsModule } from '../submissions/submissions.module';
import { StatisticsEventsController } from './statistics-events.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [SubmissionsModule],
  providers: [StatisticsService],
  controllers: [StatisticsEventsController],
})
export class StatisticsModule {}
