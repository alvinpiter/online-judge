export enum ScoreboardScoreCalculationStrategy {
  BY_SOLVE_COUNT_AND_LAST_SOLVE_TIME = 'BY_SOLVE_COUNT_AND_LAST_SOLVE_TIME',
}

export interface ScoreboardScoreCalculator {
  calculateScore: (userId: number) => Promise<number>;
  decodeScore: (score: number) => Promise<unknown>;
}
