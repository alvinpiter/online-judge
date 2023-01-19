import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompilationError } from 'src/modules/code-runner/errors/compilation-error';
import { JobQueueItem } from 'src/modules/job/interfaces';
import { JobService } from 'src/modules/job/job.service';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { SubmissionCompilationDetail } from '../entities/submission-compilation-detail.entity';
import {
  SubmissionRunDetail,
  SubmissionRunDetailWithoutId,
} from '../entities/submission-run-detail.entity';
import { Submission, SubmissionVerdict } from '../entities/submission.entity';
import { UserProblemAttempt } from '../../problems/entities/user-problem-attempt.entity';
import {
  SubmissionsJudgementQueue,
  SubmissionsJudgementQueueItem,
} from '../queues/submissions-judgement.queue';
import { SubmissionJudgmentService } from './submission-judgment.service';
import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import { hasValue } from 'src/lib/hasValue';

@Injectable()
export class SubmissionProcessorService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionsRepository: Repository<Submission>,
    @InjectRepository(SubmissionCompilationDetail)
    private readonly submissionCompilationDetailsRepository: Repository<SubmissionCompilationDetail>,
    @InjectRepository(SubmissionRunDetail)
    private readonly submissionRunDetailsRepository: Repository<SubmissionRunDetail>,
    private readonly submissionsJudgementQueue: SubmissionsJudgementQueue,
    private readonly submissionJudgmentService: SubmissionJudgmentService,
    private readonly jobService: JobService,
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
  ) {
    this.submissionsJudgementQueue.setConsumer((item) => this.process(item));
  }

  async process(
    submissionQueueItem: JobQueueItem<SubmissionsJudgementQueueItem>,
  ) {
    const jobId = submissionQueueItem.jobId;
    const submissionId = submissionQueueItem.item.submissionId;

    const submission = await this.submissionsRepository.findOneByOrFail({
      id: submissionId,
    });
    const userId = submission.userId;
    const problemId = submission.problemId;

    try {
      const { overallVerdict, submissionRunDetails } =
        await this.submissionJudgmentService.judge(submissionQueueItem);

      const userProblemAttempt =
        await this.userProblemAttemptsService.getOrInitializeUserAttempt(
          userId,
          problemId,
        );

      if (overallVerdict === SubmissionVerdict.ACCEPTED) {
        if (hasValue(userProblemAttempt.firstSolvedAt)) {
          await this.handleAlreadyAcceptedSubmission(
            submissionId,
            submissionRunDetails,
          );
        } else {
          await this.handleFirstTimeAcceptedSubmission(
            submissionId,
            submissionRunDetails,
            userProblemAttempt,
          );
        }
      } else {
        await this.handleNonAcceptedSubmission(
          submissionId,
          overallVerdict,
          submissionRunDetails,
          userProblemAttempt,
        );
      }
    } catch (e) {
      switch (e.constructor) {
        case CompilationError:
          await this.saveSubmissionCompilationDetail(submissionId, e.message);
          await this.setSubmissionVerdict(
            submissionId,
            SubmissionVerdict.COMPILE_ERROR,
          );
        default:
          throw e;
      }
    } finally {
      this.jobService.finishSuccessfully(jobId);
    }
  }

  @Transactional()
  private async handleNonAcceptedSubmission(
    submissionId: number,
    overallVerdict: SubmissionVerdict,
    submissionRunDetails: SubmissionRunDetailWithoutId[],
    userProblemAttempt: UserProblemAttempt,
  ) {
    await this.setSubmissionVerdict(submissionId, overallVerdict);
    await this.saveSubmissionRunDetails(submissionRunDetails);
    await this.userProblemAttemptsService.increaseNumberOfAttemptsAndSave(
      userProblemAttempt,
    );
  }

  @Transactional()
  private async handleFirstTimeAcceptedSubmission(
    submissionId: number,
    submissionRunDetails: SubmissionRunDetailWithoutId[],
    userProblemAttempt: UserProblemAttempt,
  ) {
    await this.setSubmissionVerdict(submissionId, SubmissionVerdict.ACCEPTED);
    await this.saveSubmissionRunDetails(submissionRunDetails);
    await this.userProblemAttemptsService.setFirstSolvedAtAndSave(
      userProblemAttempt,
    );
  }

  @Transactional()
  private async handleAlreadyAcceptedSubmission(
    submissionId: number,
    submissionRunDetails: SubmissionRunDetailWithoutId[],
  ) {
    await this.setSubmissionVerdict(submissionId, SubmissionVerdict.ACCEPTED);
    await this.saveSubmissionRunDetails(submissionRunDetails);
  }

  private async saveSubmissionCompilationDetail(
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

  private async saveSubmissionRunDetails(
    submissionRunDetails: SubmissionRunDetailWithoutId[],
  ) {
    return Promise.all(
      submissionRunDetails.map((detail) =>
        this.submissionRunDetailsRepository.save(detail),
      ),
    );
  }

  private async setSubmissionVerdict(
    submissionId: number,
    verdict: SubmissionVerdict,
  ) {
    return this.submissionsRepository.update(submissionId, { verdict });
  }
}
