export interface CodeRunOptions {
  timeLimitInMilliseconds?: number;
}

export enum CodeRunVerdict {
  OK = 'OK',
  RUN_TIME_ERROR = 'RUN_TIME_ERROR',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
}

export interface CodeRunResult {
  verdict: CodeRunVerdict;
  detail: {
    runTimeInMilliseconds: number;
    memoryUsageInKilobytes: number;
    output?: string;
  };
}

export type AfterOneInputRunCallback = (
  inputIdx: number,
  result: CodeRunResult,
) => Promise<void>;

export type AfterAllInputRunCallback = () => Promise<void>;

/*
afterOneInputRunCallback will be called after every input is run.
afterAllInputRunCallback will be called when there is no more input to run.
 */
export interface CodeRunCallback {
  afterOneInputRunCallback?: AfterOneInputRunCallback;
  afterAllInputRunCallback?: AfterAllInputRunCallback;
}
