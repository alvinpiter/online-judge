import { Injectable } from '@nestjs/common';
import { UserFormatter } from 'src/modules/users/formatters/user.formatter';
import { ScoreboardRow } from '../interfaces/scoreboard';

@Injectable()
export class ScoreboardRowFormatter {
  constructor(private readonly userFormatter: UserFormatter) {}

  format(scoreboardRow: ScoreboardRow) {
    return {
      user: this.userFormatter.format(scoreboardRow.user),
      rank: scoreboardRow.rank,
      numericScore: scoreboardRow.numericScore,
      schematicScore: scoreboardRow.schematicScore,
      userProblemAttempts: scoreboardRow.userProblemAttempts,
    };
  }
}
