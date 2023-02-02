import { Module } from '@nestjs/common';
import { JobModule } from '../job/job.module';
import { ProblemsModule } from '../problems/problems.module';
import { SubmissionsModule } from '../submissions/submissions.module';
import { UsersModule } from '../users/users.module';
import { SubmissionJudgedEventSubscriber } from './services/submission-judged-event.subscriber';
import { ScoreboardRowFormatter } from './formatters/scoreboard-row.formatter';
import { PaginationModule } from '../pagination/pagination.module';
import { ScoreboardService } from './services/scoreboard.service';
import { ScoreboardEntityIdentifierMapper } from './services/scoreboard-entity-identifier-mapper';
import { ScoreboardScoreCalculator } from './services/scoreboard-score-calculator';
import { ScoreboardScoreCalculationQueue } from './queues/scoreboard-score-calculation.queue';
import { ScoreboardController } from './controllers/scoreboard.controller';
import { ScoreboardScoreCalculationQueueController } from './controllers/scoreboard-score-calculation-queue.controller';

@Module({
  imports: [
    JobModule,
    ProblemsModule,
    UsersModule,
    SubmissionsModule,
    PaginationModule,
  ],
  providers: [
    ScoreboardScoreCalculationQueue,
    ScoreboardEntityIdentifierMapper,
    ScoreboardScoreCalculator,
    ScoreboardService,
    SubmissionJudgedEventSubscriber,
    ScoreboardRowFormatter,
  ],
  controllers: [
    ScoreboardController,
    ScoreboardScoreCalculationQueueController,
  ],
})
export class ScoreboardModule {}
