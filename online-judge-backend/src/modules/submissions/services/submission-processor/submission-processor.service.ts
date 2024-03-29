import { Injectable } from '@nestjs/common';
import { CompilationError } from 'src/modules/code-runner/errors/compilation-error';
import { JobQueueItem } from 'src/modules/job/interfaces';
import { JobService } from 'src/modules/job/job.service';
import { SubmissionVerdict } from '../../entities/submission.entity';
import {
  SubmissionsJudgementQueue,
  SubmissionsJudgementQueueItem,
} from '../../queues/submissions-judgement.queue';
import { SubmissionJudgmentService } from '../submission-judgment.service';
import { UserProblemAttemptsService } from 'src/modules/problems/services/user-problem-attempts.service';
import {
  SubmissionProcessingStrategy,
  SubmissionProcessor,
} from './interfaces';
import { SubmissionsService } from '../../submissions.service';
import { UserProblemAttempt } from 'src/modules/problems/entities/user-problem-attempt.entity';
import { Observable } from 'src/lib/Observable';

export interface SubmissionProcessorServiceEvent {
  submissionJudged: (submissionId: number) => Promise<void>;
}

@Injectable()
export class SubmissionProcessorService extends Observable<SubmissionProcessorServiceEvent> {
  private pluggedServices = new Map<
    SubmissionProcessingStrategy,
    SubmissionProcessor
  >();

  constructor(
    private readonly submissionService: SubmissionsService,
    private readonly submissionsJudgementQueue: SubmissionsJudgementQueue,
    private readonly submissionJudgmentService: SubmissionJudgmentService,
    private readonly jobService: JobService,
    private readonly userProblemAttemptsService: UserProblemAttemptsService,
  ) {
    super();
    this.submissionsJudgementQueue.setConsumer((item) => this.process(item));
  }

  plugService(key: SubmissionProcessingStrategy, service: SubmissionProcessor) {
    this.pluggedServices.set(key, service);
  }

  async process(
    submissionQueueItem: JobQueueItem<SubmissionsJudgementQueueItem>,
  ) {
    const jobId = submissionQueueItem.jobId;
    const submissionId = submissionQueueItem.item.submissionId;

    const submission = await this.submissionService.getSubmission(submissionId);
    const { userId, problemId } = submission;

    const userProblemAttempt =
      await this.userProblemAttemptsService.getOrInitializeUserProblemAttempt(
        userId,
        problemId,
      );

    try {
      const { overallVerdict, submissionRunDetails } =
        await this.submissionJudgmentService.judge(submissionQueueItem);

      const processor = this.pluggedServices.get(
        this.decideProcessingStrategy(overallVerdict, userProblemAttempt),
      );

      await processor.process({
        submission,
        verdict: overallVerdict,
        submissionRunDetails,
        previousAttempt: userProblemAttempt,
      });

      this.publishEvent('submissionJudged', (subscriber) =>
        subscriber(submission.id),
      );
    } catch (e) {
      switch (e.constructor) {
        case CompilationError:
          const processor = this.pluggedServices.get(
            SubmissionProcessingStrategy.COMPILE_ERROR,
          );
          await processor.process({
            submission,
            verdict: SubmissionVerdict.COMPILE_ERROR,
            compilationMessage: e.message,
            previousAttempt: userProblemAttempt,
          });

          break;
        default:
          throw e;
      }
    } finally {
      this.jobService.finishSuccessfully(jobId);
    }
  }

  private decideProcessingStrategy(
    overallVerdict: SubmissionVerdict,
    userProblemAttempt: UserProblemAttempt,
  ): SubmissionProcessingStrategy {
    if (overallVerdict === SubmissionVerdict.ACCEPTED) {
      if (userProblemAttempt.alreadySolved()) {
        return SubmissionProcessingStrategy.NTH_TIME_ACCEPTED;
      } else {
        return SubmissionProcessingStrategy.FIRST_TIME_ACCEPTED;
      }
    } else {
      return SubmissionProcessingStrategy.NOT_ACCEPTED;
    }
  }
}
