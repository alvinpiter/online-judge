import { Injectable } from '@nestjs/common';
import { JobQueueItem } from 'src/modules/job/interfaces';
import { ProblemTestCasesService } from 'src/modules/problems/services/problem-test-cases.service';
import {
  SubmissionRunDetail,
  SubmissionRunDetailWithoutId,
} from '../entities/submission-run-detail.entity';
import { SubmissionVerdict } from '../entities/submission.entity';
import { SubmissionsJudgementQueueItem } from '../queues/submissions-judgement.queue';
import { SubmissionsService } from '../submissions.service';
import { SubmissionCodeOutputCheckerService } from './submission-code-output-checker/submission-code-output-checker.service';
import { SubmissionCodeRunnerService } from './submission-code-runner/submission-code-runner.service';

@Injectable()
export class SubmissionJudgmentService {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly problemTestCasesService: ProblemTestCasesService,
    private readonly submissionCodeRunnerService: SubmissionCodeRunnerService,
    private readonly submissionCodeOutputCheckerService: SubmissionCodeOutputCheckerService,
  ) {}

  async judge(
    submissionQueueItem: JobQueueItem<SubmissionsJudgementQueueItem>,
  ): Promise<{
    overallVerdict: SubmissionVerdict;
    submissionRunDetails: SubmissionRunDetailWithoutId[];
  }> {
    const submissionId = submissionQueueItem.item.submissionId;
    const submission = await this.submissionsService.getSubmission(
      submissionId,
    );

    const testCases =
      await this.problemTestCasesService.getTestCasesWithContent(
        submission.problemId,
      );

    const codeRunResults = await this.submissionCodeRunnerService.run(
      submission.programmingLanguage,
      submission.code,
      testCases,
    );

    const submissionRunDetails: SubmissionRunDetail[] = [];
    for (let idx = 0; idx < testCases.length; idx++) {
      const { runTimeInMilliseconds, memoryUsageInKilobytes, output } =
        codeRunResults[idx].detail;

      const submissionRunDetail = new SubmissionRunDetail();
      submissionRunDetail.submissionId = submissionId;
      submissionRunDetail.testCaseId = testCases[idx].id;
      submissionRunDetail.runTimeInMilliseconds = runTimeInMilliseconds;
      submissionRunDetail.memoryUsageInKiloBytes = memoryUsageInKilobytes;
      submissionRunDetail.output = output;
      submissionRunDetail.verdict =
        await this.submissionCodeOutputCheckerService.check(
          testCases[idx],
          codeRunResults[idx],
        );

      submissionRunDetails.push(submissionRunDetail);
    }

    const firstNonAccepted = submissionRunDetails.find(
      (detail) => detail.verdict !== SubmissionVerdict.ACCEPTED,
    );
    const overallVerdict = firstNonAccepted
      ? firstNonAccepted.verdict
      : SubmissionVerdict.ACCEPTED;

    return {
      overallVerdict,
      submissionRunDetails,
    };
  }
}
