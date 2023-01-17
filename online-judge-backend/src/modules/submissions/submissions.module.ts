import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeRunnerModule } from '../code-runner/code-runner.module';
import { JobModule } from '../job/job.module';
import { ObjectStorageModule } from '../object-storage/object-storage.module';
import { PaginationModule } from '../pagination/pagination.module';
import { ProblemsModule } from '../problems/problems.module';
import { UsersModule } from '../users/users.module';
import { SubmissionCompilationDetail } from './entities/submission-compilation-detail.entity';
import { SubmissionRunDetail } from './entities/submission-run-detail.entity';
import { Submission } from './entities/submission.entity';
import { SubmissionFormatter } from './formatters/submission.formatter';
import { GlobalSubmissionsStatisticsUpdateQueue } from './queues/global-submissions-statistics-update.queue';
import { SubmissionsJudgementQueue } from './queues/submissions-judgement.queue';
import { UserSubmissionsStatisticsUpdateQueue } from './queues/user-submissions-statistics-update.queue';
import { SubmissionCodeOutputExactMatchCheckingStrategy } from './services/submission-code-output-checker/strategies/submission-code-output-exact-match-checking.strategy';
import { SubmissionCodeOutputCheckerService } from './services/submission-code-output-checker/submission-code-output-checker.service';
import { SubmissionCodeIORunningStrategy } from './services/submission-code-runner/strategies/submission-code-io-running.strategy';
import { SubmissionCodeRunnerService } from './services/submission-code-runner/submission-code-runner.service';
import { SubmissionJudgmentService } from './services/submission-judgment.service';
import { SubmissionProcessorService } from './services/submission-processor.service';
import { SubmissionEventsController } from './submission-events.controller';
import { SubmissionJobsService } from './submission-jobs.service';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Submission,
      SubmissionCompilationDetail,
      SubmissionRunDetail,
    ]),
    UsersModule,
    ProblemsModule,
    JobModule,
    PaginationModule,
    CodeRunnerModule,
    ObjectStorageModule,
  ],
  providers: [
    SubmissionsService,
    SubmissionProcessorService,
    SubmissionJudgmentService,
    SubmissionCodeRunnerService,
    SubmissionCodeIORunningStrategy,
    SubmissionCodeOutputCheckerService,
    SubmissionCodeOutputExactMatchCheckingStrategy,
    SubmissionJobsService,
    SubmissionsJudgementQueue,
    UserSubmissionsStatisticsUpdateQueue,
    GlobalSubmissionsStatisticsUpdateQueue,
    SubmissionFormatter,
  ],
  controllers: [SubmissionsController, SubmissionEventsController],
  exports: [
    SubmissionsService,
    UserSubmissionsStatisticsUpdateQueue,
    GlobalSubmissionsStatisticsUpdateQueue,
  ],
})
export class SubmissionsModule {}
