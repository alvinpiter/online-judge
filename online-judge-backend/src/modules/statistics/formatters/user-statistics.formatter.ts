import { Injectable } from '@nestjs/common';
import { UserStatistics } from '../interfaces/user-statistics';

@Injectable()
export class UserStatisticsFormatter {
  format(userStatistics: UserStatistics) {
    return {
      rank: userStatistics.rank,
      solvedProblems: userStatistics.solvedProblems.map((problem) => ({
        id: problem.id,
        name: problem.name,
      })),
      attemptedProblems: userStatistics.attemptedProblems.map((problem) => ({
        id: problem.id,
        name: problem.name,
      })),
    };
  }
}
