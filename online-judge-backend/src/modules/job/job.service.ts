import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { ExpiredJobError } from './errors/ExpiredJobError';
import { JobMaxRetryCountReachedError } from './errors/JobMaxRetryCountReachedError';
import { Job, JobState } from './interfaces';

const DEFAULT_JOB_EXPIRATION_TIME_IN_SECONDS = 600; // 10 minutes

@Injectable()
export class JobService {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  async create(
    identifier: string,
    maxRetryCount = 3,
    expirationTimeInSeconds = DEFAULT_JOB_EXPIRATION_TIME_IN_SECONDS,
  ) {
    const job: Job = {
      id: `${identifier}:${uuidv4()}`,
      state: JobState.IN_QUEUE,
      progress: 0,
      retryCount: 0,
      maxRetryCount: maxRetryCount,
    };

    await this.redisClient.set(
      job.id,
      JSON.stringify(job),
      'EX',
      expirationTimeInSeconds,
    );

    return job;
  }

  async retry(
    jobId: string,
    expirationTimeInSeconds = DEFAULT_JOB_EXPIRATION_TIME_IN_SECONDS,
  ) {
    const job = await this.get(jobId);

    if (job.retryCount === job.maxRetryCount) {
      throw new JobMaxRetryCountReachedError();
    }

    const newJob: Job = {
      ...job,
      state: JobState.IN_PROGRESS,
      progress: 0,
      retryCount: job.retryCount + 1,
      error: undefined,
      result: undefined,
    };

    await this.redisClient.set(
      job.id,
      JSON.stringify(newJob),
      'EX',
      expirationTimeInSeconds,
    );

    return newJob;
  }

  async updateProgress(
    jobId: string,
    progress: number,
    expirationTimeInSeconds = DEFAULT_JOB_EXPIRATION_TIME_IN_SECONDS,
  ) {
    const job = await this.get(jobId);

    const newJob: Job = {
      ...job,
      progress,
    };

    await this.redisClient.set(
      job.id,
      JSON.stringify(newJob),
      'EX',
      expirationTimeInSeconds,
    );

    return newJob;
  }

  async finishSuccessfully(
    jobId: string,
    result?: string,
    expirationTimeInSeconds = DEFAULT_JOB_EXPIRATION_TIME_IN_SECONDS,
  ) {
    const job = await this.get(jobId);

    const newJob: Job = {
      ...job,
      state: JobState.DONE,
      progress: 1,
      result,
    };

    await this.redisClient.set(
      job.id,
      JSON.stringify(newJob),
      'EX',
      expirationTimeInSeconds,
    );

    return newJob;
  }

  async finishUnsuccessfully(
    jobId: string,
    error?: string,
    expirationTimeInSeconds = DEFAULT_JOB_EXPIRATION_TIME_IN_SECONDS,
  ) {
    const job = await this.get(jobId);

    const newJob: Job = {
      ...job,
      state: JobState.FAILED,
      error,
    };

    await this.redisClient.set(
      job.id,
      JSON.stringify(newJob),
      'EX',
      expirationTimeInSeconds,
    );

    return newJob;
  }

  async get(jobId: string) {
    const jobAsString = await this.redisClient.get(jobId);
    if (!jobAsString) {
      throw new ExpiredJobError();
    }

    return JSON.parse(jobAsString) as Job;
  }
}
