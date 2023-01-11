import { AppError } from "../../AppError";

export interface HTTPGetRequestHook<Result> {
  isLoading: boolean;
  result: Result | undefined;
  error: AppError | undefined;
  requestFunction: () => Promise<void>;
}
