export class AppError extends Error {
  constructor(public readonly code: string, public readonly message: string) {
    super(message);
  }
}
