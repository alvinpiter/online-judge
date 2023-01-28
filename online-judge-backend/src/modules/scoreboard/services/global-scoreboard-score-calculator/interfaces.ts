export enum GlobalScoreboardScoreCalculationStrategy {
  BY_SOLVE_COUNT_AND_LAST_SOLVE_TIME = 'BY_SOLVE_COUNT_AND_LAST_SOLVE_TIME',
}

export interface GlobalScoreboardScoreCalculator {
  calculateScore: (userId: number) => Promise<number>;
}
