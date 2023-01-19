import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from 'src/modules/cache/cache.service';
import { Submission } from 'src/modules/submissions/entities/submission.entity';
import { Repository } from 'typeorm';
import { GLOBAL_STATISTICS_CACHE_TTL_IN_SECONDS } from '../constants';

@Injectable()
export class GlobalStatisticsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
    private readonly cacheService: CacheService,
  ) {}

  async getSubmissionsCount() {
    const cacheKey = 'GlobalSubmissionsCount';
    const query = async () => this.submissionsRepository.count();

    return this.cacheService.getFromCacheOrSource(
      cacheKey,
      query,
      GLOBAL_STATISTICS_CACHE_TTL_IN_SECONDS,
    );
  }
}
