import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobQueueItem } from '../job/interfaces';
import { JobService } from '../job/job.service';
import { ProblemsService } from '../problems/services/problems.service';
import { UsersService } from '../users/users.service';
import { SubmissionCreationDto } from './data-transfer-objects/submission-creation.dto';
import { Submission } from './entities/submission.entity';
import { SubmissionWithResolvedProperty } from './interfaces/submission-with-resolved-property';
import { GlobalSubmissionsStatisticsUpdateQueue } from './queues/global-submissions-statistics-update.queue';
import {
  SubmissionsJudgementQueue,
  SubmissionsJudgementQueueItem,
} from './queues/submissions-judgement.queue';
import { UserSubmissionsStatisticsUpdateQueue } from './queues/user-submissions-statistics-update.queue';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
    private readonly submissionsJudgementQueue: SubmissionsJudgementQueue,
    private readonly userSubmissionsStatisticsUpdateQueue: UserSubmissionsStatisticsUpdateQueue,
    private readonly globalSubmissionsStatisticsUpdateQueue: GlobalSubmissionsStatisticsUpdateQueue,
    private readonly jobService: JobService,
    private readonly usersService: UsersService,
    private readonly problemsService: ProblemsService,
  ) {
    this.submissionsJudgementQueue.setConsumer((item) => this.judge(item));
  }

  async createSubmission(
    userId: number,
    submissionCreationDto: SubmissionCreationDto,
  ) {
    const submission = new Submission();
    submission.userId = userId;
    submission.problemId = submissionCreationDto.problemId;
    submission.programmingLanguage = submissionCreationDto.programmingLanguage;
    submission.code = submissionCreationDto.code;

    const savedSubmission = await this.submissionsRepository.save(submission);

    return this.getSubmission(savedSubmission.id);
  }

  async getSubmission(
    submissionId: number,
  ): Promise<SubmissionWithResolvedProperty> {
    const submission = await this.submissionsRepository.findOneByOrFail({
      id: submissionId,
    });

    const user = await this.usersService.getUser(submission.userId);
    const problem = await this.problemsService.getProblem(submission.problemId);

    return {
      ...submission,
      user,
      problem,
    };
  }

  async judge(
    submissionQueueItem: JobQueueItem<SubmissionsJudgementQueueItem>,
  ) {
    const jobId = submissionQueueItem.jobId;
    const submissionId = submissionQueueItem.item.submissionId;

    console.log(`Judging user's submission with ID ${submissionId}...`);

    const numberOfTestCases = 10;
    for (let tc = 1; tc <= numberOfTestCases; tc++) {
      console.log(`Running testcase ${tc}...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await this.jobService.updateProgress(jobId, tc / numberOfTestCases);
    }

    await this.jobService.finishSuccessfully(jobId, 'All good!');

    console.log(`Done judging user's submission with ID ${submissionId}!`);

    this.userSubmissionsStatisticsUpdateQueue.enqueue({
      submissionId,
    });
    this.globalSubmissionsStatisticsUpdateQueue.enqueue({
      submissionId,
    });
  }
}
