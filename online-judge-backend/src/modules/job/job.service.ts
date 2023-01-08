import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { ExpiredJobError } from './errors/ExpiredJobError';
import { JobMaxRetryCountReachedError } from './errors/JobMaxRetryCountReachedError';
import { Job, JobState } from './interfaces';

const DEFAULT_JOB_EXPIRATION_TIME_IN_SECONDS = 600; // 10 minutes

@Injectable()
export class JobService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

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

    await this.cacheManager.set(job.id, job, expirationTimeInSeconds);

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

    await this.cacheManager.set(job.id, newJob, expirationTimeInSeconds);

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

    await this.cacheManager.set(job.id, newJob, expirationTimeInSeconds);

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

    await this.cacheManager.set(job.id, newJob, expirationTimeInSeconds);

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

    await this.cacheManager.set(job.id, newJob, expirationTimeInSeconds);

    return newJob;
  }

  async get(jobId: string) {
    const job = await this.cacheManager.get<Job>(jobId);
    if (!job) {
      throw new ExpiredJobError();
    }

    return job;
  }
}
