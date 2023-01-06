import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { PRIMARY_QUEUE } from 'src/modules/queue/queue.module';
import { RabbitMQ } from 'src/modules/queue/rabbitmq';

export interface UserSubmissionsStatisticsUpdateQueueItem {
  submissionId: number;
}

@Injectable()
export class UserSubmissionsStatisticsUpdateQueue extends RabbitMQ<UserSubmissionsStatisticsUpdateQueueItem> {
  constructor(@Inject(PRIMARY_QUEUE) client: ClientRMQ) {
    super(client, UserSubmissionsStatisticsUpdateQueue.name);
  }
}
