export enum JobState {
  IN_QUEUE = 'IN_QUEUE',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  FAILED = 'FAILED',
}

export interface Job {
  id: string;
  state: JobState;
  progress: number;
  retryCount: number;
  maxRetryCount: number;

  result?: string;
  error?: string;
}

export interface JobQueueItem<Item> {
  jobId: string;
  item: Item;
}
