import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserProblemAttempt } from '../entities/user-problem-attempt.entity';

@Injectable()
export class UserProblemAttemptsService {
  constructor(
    @InjectRepository(UserProblemAttempt)
    private readonly userProblemAttemptsRepository: Repository<UserProblemAttempt>,
  ) {}

  async getOrInitializeUserProblemAttempt(userId: number, problemId: number) {
    const existingUserProblemAttempt =
      await this.userProblemAttemptsRepository.findOneBy({
        userId,
        problemId,
      });

    if (existingUserProblemAttempt) {
      return existingUserProblemAttempt;
    } else {
      const userProblemAttempt = new UserProblemAttempt();
      userProblemAttempt.userId = userId;
      userProblemAttempt.problemId = problemId;

      return userProblemAttempt;
    }
  }

  async getUserProblemAttempts(
    userId: number,
    problemIds: number[],
  ): Promise<UserProblemAttempt[]> {
    return this.userProblemAttemptsRepository.findBy({
      userId,
      problemId: In(problemIds),
    });
  }

  async getAllUserAttemptsOnPublishedProblems(
    userId: number,
  ): Promise<UserProblemAttempt[]> {
    const allUserProblemAttempts =
      await this.userProblemAttemptsRepository.find({
        where: {
          userId,
        },
        relations: ['problem'],
      });

    return allUserProblemAttempts.filter((attempt) =>
      attempt.problem.isPublished(),
    );
  }

  /*
  Return a map of userId -> UserProblemAttempt[]
   */
  async getAllUsersAttemptsOnPublishedProblems(
    userIds: number[],
  ): Promise<Map<number, UserProblemAttempt[]>> {
    const allUserProblemAttempts =
      await this.userProblemAttemptsRepository.find({
        where: { userId: In(userIds) },
        relations: ['problem'],
      });

    const filteredUserProblemAttempts = allUserProblemAttempts.filter(
      (attempt) => attempt.problem.isPublished(),
    );

    const result = new Map<number, UserProblemAttempt[]>();
    for (const userProblemAttempt of filteredUserProblemAttempts) {
      if (result.has(userProblemAttempt.userId)) {
        result.get(userProblemAttempt.userId).push(userProblemAttempt);
      } else {
        result.set(userProblemAttempt.userId, [userProblemAttempt]);
      }
    }

    return result;
  }

  async increaseNumberOfAttemptsAndSave(userId: number, problemId: number) {
    const userProblemAttempt = await this.getOrInitializeUserProblemAttempt(
      userId,
      problemId,
    );

    userProblemAttempt.numberOfAttempts += 1;

    return this.userProblemAttemptsRepository.save(userProblemAttempt);
  }

  async setFirstSolvedAtAndSave(
    userId: number,
    problemId: number,
    firstSolvedAt: Date,
  ) {
    const userProblemAttempt = await this.getOrInitializeUserProblemAttempt(
      userId,
      problemId,
    );

    userProblemAttempt.firstSolvedAt = firstSolvedAt;

    return this.userProblemAttemptsRepository.save(userProblemAttempt);
  }
}
