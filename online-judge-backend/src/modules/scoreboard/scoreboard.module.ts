import { Module } from '@nestjs/common';
import { ScoreboardController } from './scoreboard.controller';
import { GlobalScoreboardSortedSetService } from './services/global-scoreboard-sorted-set.service';

@Module({
  providers: [GlobalScoreboardSortedSetService],
  exports: [GlobalScoreboardSortedSetService],
  controllers: [ScoreboardController],
})
export class ScoreboardModule {}
