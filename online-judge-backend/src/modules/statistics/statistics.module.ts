import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '../cache/cache.module';
import { Problem } from '../problems/entities/problem.entity';
import { Submission } from '../submissions/entities/submission.entity';
import { SubmissionsModule } from '../submissions/submissions.module';
import { User } from '../users/user.entity';
import { GlobalStatisticsService } from './services/global-statistics.service';
import { StatisticsEventsController } from './statistics-events.controller';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Problem, Submission]),
    SubmissionsModule,
    CacheModule,
  ],
  providers: [StatisticsService, GlobalStatisticsService],
  controllers: [StatisticsEventsController, StatisticsController],
})
export class StatisticsModule {}
