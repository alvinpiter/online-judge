export interface CodeRunOptions {
  timeLimitInMilliseconds?: number;
}

export type AfterOneInputRunCallback = (
  inputIdx: number,
  output: string,
) => Promise<boolean>;

export type AfterAllInputRunCallback = () => Promise<void>;

/*
afterOneInputRunCallback will be called after every input is run. If afterOneInputRunCallback returns false,
then the next input won't be run.

afterAllInputRunCallback will be called when there is no more input to run.
 */
export interface CodeRunCallback {
  afterOneInputRunCallback?: AfterOneInputRunCallback;
  afterAllInputRunCallback?: AfterAllInputRunCallback;
}
