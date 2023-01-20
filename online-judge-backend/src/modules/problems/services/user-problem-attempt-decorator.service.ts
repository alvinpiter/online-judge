import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/user.entity';
import { Problem } from '../entities/problem.entity';
import { UserProblemAttemptType } from '../entities/user-problem-attempt.entity';
import { UserProblemAttemptsService } from './user-problem-attempts.service';

@Injectable()
export class UserProblemAttemptDecoratorService {
  constructor(
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
  ) {}

  async addUserAttemptTypeToProblems(problems: Problem[], user: User) {
    // Maps problem id to user's UserProblemAttemptType
    const userAttemptTypesMap = new Map<number, UserProblemAttemptType>();
    const userProblemAttempts =
      await this.userProblemAttemptsService.getUserProblemAttempts(
        user.id,
        problems.map((problem) => problem.id),
      );

    userProblemAttempts.forEach((userProblemAttempt) =>
      userAttemptTypesMap.set(
        userProblemAttempt.problemId,
        userProblemAttempt.getAttemptType(),
      ),
    );

    return problems.map((problem) => {
      const userAttemptType =
        userAttemptTypesMap.get(problem.id) ||
        UserProblemAttemptType.NOT_ATTEMPTED;

      return { ...problem, userAttemptType };
    });
  }
}
