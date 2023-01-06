import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { PRIMARY_QUEUE } from 'src/modules/queue/queue.module';
import { RabbitMQ } from 'src/modules/queue/rabbitmq';

export interface SubmissionsJudgementQueueItem {
  submissionId: number;
}

@Injectable()
export class SubmissionsJudgementQueue extends RabbitMQ<SubmissionsJudgementQueueItem> {
  constructor(@Inject(PRIMARY_QUEUE) client: ClientRMQ) {
    super(client, SubmissionsJudgementQueue.name);
  }
}
