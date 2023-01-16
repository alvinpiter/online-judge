import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CodeRunnerService } from '../code-runner/code-runner.service';
import { CompilationError } from '../code-runner/errors/compilation-error';
import { CodeRunResult } from '../code-runner/interfaces';
import { JobQueueItem } from '../job/interfaces';
// import { JobService } from '../job/job.service';
import { TypeORMPaginatedQueryBuilderAdapter } from '../pagination/adapters/TypeORMPaginatedQueryBuilderAdapter';
import { OffsetPaginationService } from '../pagination/offset-pagination.service';
import { ProblemTestCasesService } from '../problems/services/problem-test-cases.service';
import { SubmissionCreationDto } from './data-transfer-objects/submission-creation.dto';
import { SubmissionsGetDto } from './data-transfer-objects/submissions-get.dto';
import { SubmissionCompilationDetail } from './entities/submission-compilation-detail.entity';
import { SubmissionRunDetail } from './entities/submission-run-detail.entity';
import { Submission, SubmissionVerdict } from './entities/submission.entity';
import { SubmissionsSelectQueryBuilder } from './helpers/submissions-select.query-builder';
import { summarizeCodeRunResult } from './helpers/summarize-code-run-result';
import { SubmissionWithResolvedProperty } from './interfaces/submission-with-resolved-property';
import {
  SubmissionsJudgementQueue,
  SubmissionsJudgementQueueItem,
} from './queues/submissions-judgement.queue';

const SUBMISSIONS_DEFAULT_OFFSET = 0;
const SUBMISSIONS_DEFAULT_LIMIT = 10;

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
    @InjectRepository(SubmissionCompilationDetail)
    private readonly submissionCompilationDetailsRepository: Repository<SubmissionCompilationDetail>,
    @InjectRepository(SubmissionRunDetail)
    private readonly submissionRunDetailsRepository: Repository<SubmissionRunDetail>,
    private readonly submissionsJudgementQueue: SubmissionsJudgementQueue,
    // private readonly jobService: JobService,
    private readonly offsetPaginationService: OffsetPaginationService,
    private readonly codeRunnerService: CodeRunnerService,
    private readonly problemTestCasesService: ProblemTestCasesService,
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

    await this.submissionsJudgementQueue.enqueue({
      submissionId: savedSubmission.id,
    });

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

  async judge(
    submissionQueueItem: JobQueueItem<SubmissionsJudgementQueueItem>,
  ) {
    const submissionId = submissionQueueItem.item.submissionId;
    const submission = await this.getSubmission(submissionId);

    const testCases =
      await this.problemTestCasesService.getTestCasesWithContent(
        submission.problemId,
      );

    const afterOneInputRunCallback = async (
      inputIdx: number,
      result: CodeRunResult,
    ) => {
      console.log({
        inputIdx,
        result,
      });
    };

    try {
      const codeRunResults = await this.codeRunnerService.runCode(
        submission.programmingLanguage,
        submission.code,
        testCases.map((testCase) => testCase.input),
        { afterOneInputRunCallback },
      );

      const { verdict, submissionRunDetails } = summarizeCodeRunResult(
        submissionId,
        testCases,
        codeRunResults,
      );

      await this.setSubmissionVerdict(submissionId, verdict);
      await Promise.all(
        submissionRunDetails.map((submissionRunDetail) =>
          this.submissionRunDetailsRepository.save(submissionRunDetail),
        ),
      );
    } catch (e) {
      switch (e.constructor) {
        case CompilationError:
          await this.saveSubmissionCompilationErrorDetail(
            submissionId,
            e.message,
          );
          await this.setSubmissionVerdict(
            submissionId,
            SubmissionVerdict.COMPILE_ERROR,
          );
          break;
        default:
          throw e;
      }
    }
  }

  private async saveSubmissionCompilationErrorDetail(
    submissionId: number,
    message: string,
  ) {
    const submissionCompilationDetail = new SubmissionCompilationDetail();
    submissionCompilationDetail.submissionId = submissionId;
    submissionCompilationDetail.message = message;

    return this.submissionCompilationDetailsRepository.save(
      submissionCompilationDetail,
    );
  }

  private setSubmissionVerdict(
    submissionId: number,
    verdict: SubmissionVerdict,
  ) {
    return this.submissionsRepository.update(submissionId, { verdict });
  }
}
