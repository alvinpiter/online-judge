import { ClientRMQ, RmqContext } from '@nestjs/microservices';
import { ConfirmChannel, Message } from 'amqplib';

export type QueueConsumer<Item> = (item: Item) => void | Promise<void>;

export class RabbitMQ<Item> {
  private consumer: QueueConsumer<Item> | undefined;

  constructor(
    private readonly client: ClientRMQ,
    private readonly emitPattern: string,
  ) {}

  setConsumer(consumer: QueueConsumer<Item>) {
    this.consumer = consumer;
  }

  async consume(item: Item, context: RmqContext) {
    await this.consumer(item);

    const channel: ConfirmChannel = context.getChannelRef();
    const message: Message = context.getMessage() as Message;

    channel.ack(message);
  }

  enqueue(item: Item) {
    this.client.emit(this.emitPattern, item);
  }
}
