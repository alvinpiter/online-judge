export class ServerError extends Error {
  constructor(public code: string, public message: string) {
    super(message);
  }
}
