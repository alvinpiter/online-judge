import { Module } from '@nestjs/common';
import { ProblemsModule } from '../problems/problems.module';
import { UsersModule } from '../users/users.module';
import { ScoreboardRowFormatter } from './formatters/scoreboard-row.formatter';
import { ScoreboardController } from './scoreboard.controller';
import { ScoreboardService } from './scoreboard.service';

@Module({
  imports: [ProblemsModule, UsersModule],
  providers: [ScoreboardService, ScoreboardRowFormatter],
  controllers: [ScoreboardController],
})
export class ScoreboardModule {}
