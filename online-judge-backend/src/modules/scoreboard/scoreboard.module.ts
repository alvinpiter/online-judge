import { Module } from '@nestjs/common';
import { JobModule } from '../job/job.module';
import { ProblemsModule } from '../problems/problems.module';
import { SubmissionsModule } from '../submissions/submissions.module';
import { UsersModule } from '../users/users.module';
import { GlobalScoreboardScoreCalculationQueueController } from './controllers/global-scoreboard-score-calculation-queue.controller';
import { GlobalScoreboardScoreCalculationQueue } from './queues/global-scoreboard-score-calculation.queue';
import { SubmissionJudgedEventSubscriber } from './services/submission-judged-event.subscriber';
import { GlobalScoreboardController } from './controllers/global-scoreboard.controller';
import { BySolveCountAndLastSolveTimeStrategy } from './services/scoreboard-score-calculator/strategies/by-solve-count-and-last-solve-time.strategy';
import { ScoreboardRowFormatter } from './formatters/scoreboard-row.formatter';
import { ScoreboardReaderService } from './services/scoreboard-service/scoreboard-reader.service';
import { ScoreboardScoreCalculatorService } from './services/scoreboard-score-calculator/scoreboard-score-calculator.service';
import { PaginationModule } from '../pagination/pagination.module';
import { ScoreboardService } from './services/scoreboard.service';
import { ScoreboardEntityIdentifierMapper } from './services/scoreboard-entity-identifier-mapper';
import { ScoreboardScoreCalculator } from './services/scoreboard-score-calculator';

@Module({
  imports: [
    JobModule,
    ProblemsModule,
    UsersModule,
    SubmissionsModule,
    PaginationModule,
  ],
  providers: [
    ScoreboardEntityIdentifierMapper,
    ScoreboardScoreCalculator,
    ScoreboardService,

    ScoreboardReaderService,
    ScoreboardScoreCalculatorService,
    BySolveCountAndLastSolveTimeStrategy,
    SubmissionJudgedEventSubscriber,
    GlobalScoreboardScoreCalculationQueue,
    ScoreboardRowFormatter,
  ],
  controllers: [
    GlobalScoreboardController,
    GlobalScoreboardScoreCalculationQueueController,
  ],
})
export class ScoreboardModule {}
