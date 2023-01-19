import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '../cache/cache.module';
import { Submission } from '../submissions/entities/submission.entity';
import { SubmissionsModule } from '../submissions/submissions.module';
import { GlobalStatisticsService } from './services/global-statistics.service';
import { StatisticsEventsController } from './statistics-events.controller';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    SubmissionsModule,
    CacheModule,
  ],
  providers: [StatisticsService, GlobalStatisticsService],
  controllers: [StatisticsEventsController, StatisticsController],
})
export class StatisticsModule {}
