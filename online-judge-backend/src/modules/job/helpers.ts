import * as amqplib from 'amqplib';

export function getRmqOptions(
  urls: string[],
  username: string,
  password: string,
  queue: string,
  prefetchCount = 1,
) {
  return {
    urls,
    socketOptions: {
      credentials: amqplib.credentials.plain(username, password),
    },
    queue,
    noAck: false,
    queueOptions: { durable: true },
    prefetchCount,
  };
}
