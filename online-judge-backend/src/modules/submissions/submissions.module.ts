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
import { SubmissionEventsController } from './submission-events.controller';
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
