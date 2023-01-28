import { Module } from '@nestjs/common';
import { ProblemsModule } from '../problems/problems.module';
import { ScoreboardController } from './scoreboard.controller';
import { GlobalScoreboardScoreCalculatorService } from './services/global-scoreboard-score-calculator/global-scoreboard-score-calculator.service';
import { BySolveCountAndLastAcceptedTimeStrategy } from './services/global-scoreboard-score-calculator/strategies/by-solve-count-and-last-accepted-time.strategy';
import { GlobalScoreboardSortedSetService } from './services/global-scoreboard-sorted-set.service';

@Module({
  imports: [ProblemsModule],
  providers: [
    GlobalScoreboardSortedSetService,
    GlobalScoreboardScoreCalculatorService,
    BySolveCountAndLastAcceptedTimeStrategy,
  ],
  exports: [GlobalScoreboardSortedSetService],
  controllers: [ScoreboardController],
})
export class ScoreboardModule {}
