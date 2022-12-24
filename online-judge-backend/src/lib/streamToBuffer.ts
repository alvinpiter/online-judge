import { Readable } from 'stream';

export async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const result = [];

    stream.on('data', (chunk) => result.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(result)));
    stream.on('error', () => reject(`error converting to stream`));
  });
}
