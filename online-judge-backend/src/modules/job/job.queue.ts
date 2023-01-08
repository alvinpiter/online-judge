import { ClientRMQ, RmqContext } from '@nestjs/microservices';
import { ConfirmChannel, Message } from 'amqplib';
import { ExpiredJobError } from './errors/ExpiredJobError';
import { JobMaxRetryCountReachedError } from './errors/JobMaxRetryCountReachedError';
import { JobQueueItem } from './interfaces';
import { JobService } from './job.service';

export type QueueConsumer<Item> = (item: Item) => void | Promise<void>;

export class JobQueue<Item> {
  private consumer: QueueConsumer<JobQueueItem<Item>>;

  constructor(
    private readonly rmqClient: ClientRMQ,
    private readonly rmqEmitPattern: string,
    private readonly jobService: JobService,
  ) {}

  setConsumer(consumer: QueueConsumer<JobQueueItem<Item>>) {
    this.consumer = consumer;
  }

  async enqueue(item: Item) {
    const job = await this.jobService.create(this.rmqEmitPattern);
    this.rmqClient.emit<any, JobQueueItem<Item>>(this.rmqEmitPattern, {
      jobId: job.id,
      item,
    });

    return job.id;
  }

  async consume(jobQueueItem: JobQueueItem<Item>, context: RmqContext) {
    const jobId = jobQueueItem.jobId;

    const channel: ConfirmChannel = context.getChannelRef();
    const message: Message = context.getMessage() as Message;

    try {
      await this.jobService.retry(jobId);
      await this.doConsume(jobQueueItem);
      channel.ack(message);
    } catch (e) {
      if (
        e instanceof ExpiredJobError ||
        e instanceof JobMaxRetryCountReachedError
      ) {
        console.log(`Error while executing job ${jobId}: ${e.message}`);
        channel.ack(message);
        return;
      }

      // Retry
      this.jobService.finishUnsuccessfully(jobId, e?.message);
      this.consume(jobQueueItem, context);
    }
  }

  private async doConsume(jobQueueItem: JobQueueItem<Item>) {
    if (!this.consumer) {
      throw new Error(this.rmqEmitPattern);
    }

    await this.consumer(jobQueueItem);
  }
}
