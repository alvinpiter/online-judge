import { Module } from '@nestjs/common';
import { QueueModule } from '../queue/queue.module';
import { GlobalSubmissionsStatisticsUpdateQueue } from './queues/global-submissions-statistics-update.queue';
import { SubmissionsJudgementQueue } from './queues/submissions-judgement.queue';
import { UserSubmissionsStatisticsUpdateQueue } from './queues/user-submissions-statistics-update.queue';
import { SubmissionEventsController } from './submission-events.controller';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';

@Module({
  imports: [QueueModule],
  providers: [
    SubmissionsService,
    SubmissionsJudgementQueue,
    UserSubmissionsStatisticsUpdateQueue,
    GlobalSubmissionsStatisticsUpdateQueue,
  ],
  controllers: [SubmissionsController, SubmissionEventsController],
  exports: [
    SubmissionsService,
    UserSubmissionsStatisticsUpdateQueue,
    GlobalSubmissionsStatisticsUpdateQueue,
  ],
})
export class SubmissionsModule {}
