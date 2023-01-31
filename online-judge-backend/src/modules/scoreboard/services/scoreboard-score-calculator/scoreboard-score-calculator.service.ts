import { Injectable } from '@nestjs/common';
import { PluggableService } from 'src/lib/PluggableService';
import {
  ScoreboardScoreCalculationStrategy,
  ScoreboardScoreCalculator,
} from './interfaces';

@Injectable()
export class ScoreboardScoreCalculatorService extends PluggableService<
  ScoreboardScoreCalculationStrategy,
  ScoreboardScoreCalculator
> {
  constructor() {
    super();
  }

  async calculateScore(
    userId: number,
    strategy: ScoreboardScoreCalculationStrategy,
  ) {
    const service = this.pluggedServices.get(strategy);
    return service.calculateScore(userId);
  }

  async decodeScore(
    score: number,
    strategy: ScoreboardScoreCalculationStrategy,
  ): Promise<unknown> {
    const service = this.pluggedServices.get(strategy);
    return service.decodeScore(score);
  }
}
