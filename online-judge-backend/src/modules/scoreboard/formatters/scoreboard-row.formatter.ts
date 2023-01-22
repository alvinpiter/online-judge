import { Injectable } from '@nestjs/common';
import { UserFormatter } from 'src/modules/users/formatters/user.formatter';
import { ScoreboardRow } from '../interfaces/scoreboard-row';

@Injectable()
export class ScoreboardRowFormatter {
  constructor(private readonly userFormatter: UserFormatter) {}

  format(scoreboardRow: ScoreboardRow) {
    return {
      user: this.userFormatter.format(scoreboardRow.user),
      userProblemAttempts: scoreboardRow.userProblemAttempts,
    };
  }
}
