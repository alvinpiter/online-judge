import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import {
  SubmissionsJudgementQueue,
  SubmissionsJudgementQueueItem,
} from './queues/submissions-judgement.queue';

@Controller()
export class SubmissionEventsController {
  constructor(
    private readonly submissionsJudgementQueue: SubmissionsJudgementQueue,
  ) {}

  @EventPattern(SubmissionsJudgementQueue.name)
  judgeSubmission(
    @Payload() item: SubmissionsJudgementQueueItem,
    @Ctx() context: RmqContext,
  ) {
    this.submissionsJudgementQueue.consume(item, context);
  }
}
