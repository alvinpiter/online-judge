import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/modules/cache/cache.service';
import {
  Problem,
  ProblemState,
} from 'src/modules/problems/entities/problem.entity';
import { Submission } from 'src/modules/submissions/entities/submission.entity';
import { User, UserRole } from 'src/modules/users/user.entity';
import { Repository } from 'typeorm';
import { GLOBAL_STATISTICS_CACHE_TTL_IN_SECONDS } from '../constants';

@Injectable()
export class GlobalStatisticsService {
  private CACHE_KEY_PREFIX = 'GlobalStatistics';

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Problem)
    private readonly problemsRepository: Repository<Problem>,
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
    private readonly cacheService: CacheService,
  ) {}

  async getGlobalStatistics() {
    return {
      numberOfUsers: await this.getNumberOfUsers(),
      numberOfProblems: await this.getNumberOfProblems(),
      numberOfSubmissions: await this.getNumberOfSubmissions(),
    };
  }

  async getNumberOfUsers() {
    const cacheKey = `${this.CACHE_KEY_PREFIX}:NumberOfUsers`;
    const query = async () =>
      this.usersRepository.count({ where: { role: UserRole.USER } });

    return this.cacheService.getFromCacheOrSource(
      cacheKey,
      query,
      GLOBAL_STATISTICS_CACHE_TTL_IN_SECONDS,
    );
  }

  async getNumberOfProblems() {
    const cacheKey = `${this.CACHE_KEY_PREFIX}:NumberOfProblems`;
    const query = async () =>
      this.problemsRepository.count({
        where: { state: ProblemState.PUBLISHED },
      });

    return this.cacheService.getFromCacheOrSource(
      cacheKey,
      query,
      GLOBAL_STATISTICS_CACHE_TTL_IN_SECONDS,
    );
  }

  async getNumberOfSubmissions() {
    const cacheKey = `${this.CACHE_KEY_PREFIX}:NumberOfSubmissions`;
    const query = async () => this.submissionsRepository.count();

    return this.cacheService.getFromCacheOrSource(
      cacheKey,
      query,
      GLOBAL_STATISTICS_CACHE_TTL_IN_SECONDS,
    );
  }
}
