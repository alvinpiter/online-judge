import { Module } from '@nestjs/common';
import { JobModule } from '../job/job.module';
import { ProblemsModule } from '../problems/problems.module';
import { SubmissionsModule } from '../submissions/submissions.module';
import { GlobalScoreboardScoreCalculationQueueController } from './global-scoreboard-score-calculation-queue.controller';
import { GlobalScoreboardScoreCalculationQueue } from './queues/global-scoreboard-score-calculation.queue';
import { ScoreboardEventSubscriber } from './scoreboard-event.subscriber';
import { ScoreboardController } from './scoreboard.controller';
import { GlobalScoreboardScoreCalculationQueueConsumer } from './services/global-scoreboard-score-calculation-queue.consumer';
import { GlobalScoreboardScoreCalculatorService } from './services/global-scoreboard-score-calculator/global-scoreboard-score-calculator.service';
import { BySolveCountAndLastAcceptedTimeStrategy } from './services/global-scoreboard-score-calculator/strategies/by-solve-count-and-last-accepted-time.strategy';
import { GlobalScoreboardSortedSetService } from './services/global-scoreboard-sorted-set.service';

@Module({
  imports: [JobModule, ProblemsModule, SubmissionsModule],
  providers: [
    GlobalScoreboardSortedSetService,
    GlobalScoreboardScoreCalculatorService,
    BySolveCountAndLastAcceptedTimeStrategy,
    ScoreboardEventSubscriber,
    GlobalScoreboardScoreCalculationQueue,
    GlobalScoreboardScoreCalculationQueueConsumer,
  ],
  exports: [GlobalScoreboardSortedSetService],
  controllers: [
    ScoreboardController,
    GlobalScoreboardScoreCalculationQueueController,
  ],
})
export class ScoreboardModule {}
