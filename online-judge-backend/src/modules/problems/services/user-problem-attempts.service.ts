import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProblemAttempt } from '../entities/user-problem-attempt.entity';

@Injectable()
export class UserProblemAttemptsService {
  constructor(
    @InjectRepository(UserProblemAttempt)
    private readonly userProblemAttemptsRepository: Repository<UserProblemAttempt>,
  ) {}

  async getOrInitializeUserAttempt(userId: number, problemId: number) {
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

  async increaseNumberOfAttemptsAndSave(
    userProblemAttempt: UserProblemAttempt,
  ) {
    userProblemAttempt.numberOfAttempts += 1;
    this.userProblemAttemptsRepository.save(userProblemAttempt);
  }

  async setFirstSolvedAtAndSave(userProblemAttempt: UserProblemAttempt) {
    userProblemAttempt.firstSolvedAt = new Date();
    this.userProblemAttemptsRepository.save(userProblemAttempt);
  }
}
