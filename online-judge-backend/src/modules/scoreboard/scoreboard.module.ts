import { Module } from '@nestjs/common';
import { JobModule } from '../job/job.module';
import { ProblemsModule } from '../problems/problems.module';
import { SubmissionsModule } from '../submissions/submissions.module';
import { UsersModule } from '../users/users.module';
import { GlobalScoreboardScoreCalculationQueueController } from './controllers/global-scoreboard-score-calculation-queue.controller';
import { GlobalScoreboardScoreCalculationQueue } from './queues/global-scoreboard-score-calculation.queue';
import { SubmissionJudgedEventSubscriber } from './services/submission-judged-event.subscriber';
import { ScoreboardController } from './controllers/scoreboard.controller';
import { GlobalScoreboardScoreCalculationQueueConsumer } from './services/global-scoreboard-score-calculation-queue.consumer';
import { GlobalScoreboardScoreCalculatorService } from './services/global-scoreboard-score-calculator/global-scoreboard-score-calculator.service';
import { BySolveCountAndLastAcceptedTimeStrategy } from './services/global-scoreboard-score-calculator/strategies/by-solve-count-and-last-accepted-time.strategy';
import { GlobalScoreboardSortedSetService } from './services/global-scoreboard-sorted-set.service';
import { ScoreboardService } from './services/scoreboard.service';
import { ScoreboardRowFormatter } from './formatters/scoreboard-row.formatter';

@Module({
  imports: [JobModule, ProblemsModule, UsersModule, SubmissionsModule],
  providers: [
    ScoreboardService,
    GlobalScoreboardSortedSetService,
    GlobalScoreboardScoreCalculatorService,
    BySolveCountAndLastAcceptedTimeStrategy,
    SubmissionJudgedEventSubscriber,
    GlobalScoreboardScoreCalculationQueue,
    GlobalScoreboardScoreCalculationQueueConsumer,
    ScoreboardRowFormatter,
  ],
  exports: [GlobalScoreboardSortedSetService],
  controllers: [
    ScoreboardController,
    GlobalScoreboardScoreCalculationQueueController,
  ],
})
export class ScoreboardModule {}
