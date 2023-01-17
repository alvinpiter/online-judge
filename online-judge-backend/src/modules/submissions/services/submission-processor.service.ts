import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompilationError } from 'src/modules/code-runner/errors/compilation-error';
import { JobQueueItem } from 'src/modules/job/interfaces';
import { JobService } from 'src/modules/job/job.service';
import { Repository } from 'typeorm';
import { SubmissionCompilationDetail } from '../entities/submission-compilation-detail.entity';
import {
  SubmissionRunDetail,
  SubmissionRunDetailWithoutId,
} from '../entities/submission-run-detail.entity';
import { Submission, SubmissionVerdict } from '../entities/submission.entity';
import {
  SubmissionsJudgementQueue,
  SubmissionsJudgementQueueItem,
} from '../queues/submissions-judgement.queue';
import { SubmissionJudgmentService } from './submission-judgment.service';

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
  ) {
    this.submissionsJudgementQueue.setConsumer((item) => this.process(item));
  }

  async process(
    submissionQueueItem: JobQueueItem<SubmissionsJudgementQueueItem>,
  ) {
    const jobId = submissionQueueItem.jobId;
    const submissionId = submissionQueueItem.item.submissionId;

    try {
      const { overallVerdict, submissionRunDetails } =
        await this.submissionJudgmentService.judge(submissionQueueItem);

      await this.saveSubmissionRunDetails(submissionRunDetails);
      await this.setSubmissionVerdict(submissionId, overallVerdict);
    } catch (e) {
      console.log(e);

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
