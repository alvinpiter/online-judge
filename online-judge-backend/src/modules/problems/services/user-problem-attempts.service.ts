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

  async getAllUserProblemAttempts(
    userId: number,
  ): Promise<UserProblemAttempt[]> {
    return this.userProblemAttemptsRepository.findBy({ userId });
  }

  /*
  Return a map of userId -> UserProblemAttempt[]
   */
  async getAllUsersProblemAttempts(
    userIds: number[],
  ): Promise<Map<number, UserProblemAttempt[]>> {
    const allUserProblemAttempts =
      await this.userProblemAttemptsRepository.findBy({
        userId: In(userIds),
      });

    const result = new Map<number, UserProblemAttempt[]>();
    for (const userProblemAttempt of allUserProblemAttempts) {
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

  async setFirstSolvedAtAndSave(userId: number, problemId: number) {
    const userProblemAttempt = await this.getOrInitializeUserProblemAttempt(
      userId,
      problemId,
    );

    userProblemAttempt.firstSolvedAt = new Date();

    return this.userProblemAttemptsRepository.save(userProblemAttempt);
  }
}
