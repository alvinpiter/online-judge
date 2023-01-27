import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Job } from '../job/interfaces';
import { JobService } from '../job/job.service';

@Injectable()
export class SubmissionJobsService {
  private readonly CACHE_KEY_PREFIX = 'SubmissionJobId';
  private readonly CACHE_EXPIRATION_TIME_IN_SECONDS = 600; // 10 minutes

  constructor(
    @InjectRedis() private readonly redisClient: Redis,
    private readonly jobService: JobService,
  ) {}

  async setSubmissionJobId(submissionId: number, jobId: string) {
    this.redisClient.set(
      this.getCacheKey(submissionId),
      jobId,
      'EX',
      this.CACHE_EXPIRATION_TIME_IN_SECONDS,
    );
  }

  async getSubmissionJob(submissionId: number): Promise<Job> {
    return this.jobService.get(await this.getJobId(submissionId));
  }

  private getCacheKey(submissionId: number): string {
    return `${this.CACHE_KEY_PREFIX}:${submissionId}`;
  }

  private async getJobId(submissionId: number): Promise<string> {
    return (await this.redisClient.get(this.getCacheKey(submissionId))) || '';
  }
}
