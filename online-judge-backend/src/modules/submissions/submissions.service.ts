import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TypeORMPaginatedQueryBuilderAdapter } from '../pagination/adapters/TypeORMPaginatedQueryBuilderAdapter';
import { OffsetPaginationService } from '../pagination/offset-pagination.service';
import { SubmissionCreationDto } from './data-transfer-objects/submission-creation.dto';
import { SubmissionsGetDto } from './data-transfer-objects/submissions-get.dto';
import { Submission } from './entities/submission.entity';
import { SubmissionsSelectQueryBuilder } from './helpers/submissions-select.query-builder';
import { SubmissionWithResolvedProperty } from './interfaces/submission-with-resolved-property';
import { SubmissionsJudgementQueue } from './queues/submissions-judgement.queue';
import { SubmissionJobsService } from './submission-jobs.service';

const SUBMISSIONS_DEFAULT_OFFSET = 0;
const SUBMISSIONS_DEFAULT_LIMIT = 10;

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
    private readonly submissionsJudgementQueue: SubmissionsJudgementQueue,
    private readonly offsetPaginationService: OffsetPaginationService,
    private readonly submissionJobsService: SubmissionJobsService,
  ) {}

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

    Reference:
    * https://stackoverflow.com/a/3799966
    * https://github.com/typeorm/typeorm/issues/5544#issuecomment-602110571
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
}
