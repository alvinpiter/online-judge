import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '../cache/cache.module';
import { Problem } from '../problems/entities/problem.entity';
import { ProblemsModule } from '../problems/problems.module';
import { ScoreboardModule } from '../scoreboard/scoreboard.module';
import { Submission } from '../submissions/entities/submission.entity';
import { SubmissionsModule } from '../submissions/submissions.module';
import { User } from '../users/user.entity';
import { UserStatisticsFormatter } from './formatters/user-statistics.formatter';
import { GlobalStatisticsService } from './services/global-statistics.service';
import { UserStatisticsService } from './services/user-statistics.service';
import { StatisticsEventsController } from './statistics-events.controller';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Problem, Submission]),
    ProblemsModule,
    SubmissionsModule,
    ScoreboardModule,
    CacheModule,
  ],
  providers: [
    StatisticsService,
    GlobalStatisticsService,
    UserStatisticsService,
    UserStatisticsFormatter,
  ],
  controllers: [StatisticsEventsController, StatisticsController],
})
export class StatisticsModule {}
