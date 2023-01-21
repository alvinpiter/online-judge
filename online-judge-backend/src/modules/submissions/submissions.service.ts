import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'src/lib/Observable';
import { orderEntitiesById } from 'src/lib/orderEntitiesById';
import { In, Repository } from 'typeorm';
import { TypeORMPaginatedQueryBuilderAdapter } from '../pagination/adapters/TypeORMPaginatedQueryBuilderAdapter';
import { OffsetPaginationService } from '../pagination/offset-pagination.service';
import { SubmissionCreationDto } from './data-transfer-objects/submission-creation.dto';
import { SubmissionsGetDto } from './data-transfer-objects/submissions-get.dto';
import { SubmissionCompilationDetail } from './entities/submission-compilation-detail.entity';
import { SubmissionRunDetail } from './entities/submission-run-detail.entity';
import { Submission, SubmissionVerdict } from './entities/submission.entity';
import { SubmissionsSelectQueryBuilder } from './helpers/submissions-select.query-builder';
import { SubmissionRunDetailWithTestCase } from './interfaces/submission-run-detail-with-test-case';
import { SubmissionWithResolvedProperty } from './interfaces/submission-with-resolved-property';
import { SubmissionWithDetails } from './interfaces/submition-with-details';
import { SubmissionsJudgementQueue } from './queues/submissions-judgement.queue';
import { SubmissionJobsService } from './submission-jobs.service';

export interface SubmissionsServiceEvent {
  submissionCreated: (submission: Submission) => Promise<void>;
}

const SUBMISSIONS_DEFAULT_OFFSET = 0;
const SUBMISSIONS_DEFAULT_LIMIT = 10;

@Injectable()
export class SubmissionsService extends Observable<SubmissionsServiceEvent> {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
    @InjectRepository(SubmissionCompilationDetail)
    private readonly submissionCompilationDetailsRepository: Repository<SubmissionCompilationDetail>,
    @InjectRepository(SubmissionRunDetail)
    private readonly submissionRunDetailsRepository: Repository<SubmissionRunDetail>,
    private readonly submissionsJudgementQueue: SubmissionsJudgementQueue,
    private readonly offsetPaginationService: OffsetPaginationService,
    private readonly submissionJobsService: SubmissionJobsService,
  ) {
    super();
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

    const jobId = await this.submissionsJudgementQueue.enqueue({
      submissionId: savedSubmission.id,
    });
    await this.submissionJobsService.setSubmissionJobId(
      savedSubmission.id,
      jobId,
    );
    this.publishEvent('submissionCreated', (subscriber) =>
      subscriber(savedSubmission),
    );

    return this.getSubmission(savedSubmission.id);
  }

  async getSubmission(
    submissionId: number,
    relations = ['user', 'problem'],
  ): Promise<SubmissionWithResolvedProperty> {
    return this.submissionsRepository.findOneOrFail({
      where: { id: submissionId },
      relations,
    });
  }

  async getSubmissionWithDetails(
    submissionId: number,
  ): Promise<SubmissionWithDetails> {
    const submission = await this.getSubmission(submissionId);

    const compilationDetail =
      await this.submissionCompilationDetailsRepository.findOneBy({
        submissionId,
      });

    const runDetails = (await this.submissionRunDetailsRepository.find({
      where: { submissionId },
      relations: ['testCase'],
      order: { testCaseId: 'ASC' },
    })) as SubmissionRunDetailWithTestCase[];

    return {
      ...submission,
      compilationDetail,
      runDetails,
    };
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

    const populatedSubmissions = await this.getSubmissionsByIds(
      submissions.map((submission) => submission.id),
      ['user', 'problem'],
    );

    return {
      data: populatedSubmissions,
      meta,
    };
  }

  async setSubmissionVerdict(submissionId: number, verdict: SubmissionVerdict) {
    return this.submissionsRepository.update(submissionId, { verdict });
  }

  private async getSubmissionsByIds(ids: number[], relations: string[]) {
    /*
    TODO:
    Select * where in (...) doesn't guarantee the rows are returned in
    order. We need to specify the order here, hence the order in SubmissionsSelectQueryBuilder
    is redundant. Find a way to solve this.

    Reference:
    * https://stackoverflow.com/a/3799966
    * https://github.com/typeorm/typeorm/issues/5544#issuecomment-602110571
     */
    const submissions = await this.submissionsRepository.find({
      where: { id: In(ids) },
      relations,
    });

    return orderEntitiesById(ids, submissions);
  }
}
