export class ServerError extends Error {
  constructor(public readonly code: string, public readonly message: string) {
    super(message);
  }
}
