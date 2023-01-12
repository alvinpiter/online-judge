import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { JobQueueItem } from '../job/interfaces';
import { JobService } from '../job/job.service';
import { TypeORMPaginatedQueryBuilderAdapter } from '../pagination/adapters/TypeORMPaginatedQueryBuilderAdapter';
import { OffsetPaginationService } from '../pagination/offset-pagination.service';
import { SubmissionCreationDto } from './data-transfer-objects/submission-creation.dto';
import { SubmissionsGetDto } from './data-transfer-objects/submissions-get.dto';
import { Submission } from './entities/submission.entity';
import { SubmissionsSelectQueryBuilder } from './helpers/submissions-select.query-builder';
import { SubmissionWithResolvedProperty } from './interfaces/submission-with-resolved-property';
import { GlobalSubmissionsStatisticsUpdateQueue } from './queues/global-submissions-statistics-update.queue';
import {
  SubmissionsJudgementQueue,
  SubmissionsJudgementQueueItem,
} from './queues/submissions-judgement.queue';
import { UserSubmissionsStatisticsUpdateQueue } from './queues/user-submissions-statistics-update.queue';

const SUBMISSIONS_DEFAULT_OFFSET = 0;
const SUBMISSIONS_DEFAULT_LIMIT = 10;

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
    private readonly submissionsJudgementQueue: SubmissionsJudgementQueue,
    private readonly userSubmissionsStatisticsUpdateQueue: UserSubmissionsStatisticsUpdateQueue,
    private readonly globalSubmissionsStatisticsUpdateQueue: GlobalSubmissionsStatisticsUpdateQueue,
    private readonly jobService: JobService,
    private readonly offsetPaginationService: OffsetPaginationService,
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
    return this.submissionsRepository.findOneOrFail({
      where: { id: submissionId },
      relations: ['user', 'problem'],
    });
  }

  async getSubmissions(submissionsGetDto: SubmissionsGetDto) {
    const qb = SubmissionsSelectQueryBuilder.build(
      this.submissionsRepository,
      submissionsGetDto,
    );

    const { data: submissions, meta } =
      await this.offsetPaginationService.paginate(
        new TypeORMPaginatedQueryBuilderAdapter(qb),
        {
          offset: submissionsGetDto.offset || SUBMISSIONS_DEFAULT_OFFSET,
          limit: submissionsGetDto.limit || SUBMISSIONS_DEFAULT_LIMIT,
        },
      );

    const submissionIds = submissions.map((submission) => submission.id);

    /*
    TODO:
    Select * where in (...) doesn't guarantee the rows are returned in
    order. We need to specify the order here, hence the order in SubmissionsSelectQueryBuilder
    is redundant. Find a way to solve this.
     */
    const populatedSubmissions = (await this.submissionsRepository.find({
      where: { id: In(submissionIds) },
      relations: ['user', 'problem'],
      order: { id: 'DESC' },
    })) as SubmissionWithResolvedProperty[];

    return {
      data: populatedSubmissions,
      meta,
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
