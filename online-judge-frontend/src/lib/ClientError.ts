export class ClientError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}
