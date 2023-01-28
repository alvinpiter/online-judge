import { Injectable } from '@nestjs/common';
import { PluggableService } from 'src/lib/PluggableService';
import {
  GlobalScoreboardScoreCalculationStrategy,
  GlobalScoreboardScoreCalculator,
} from './interfaces';

@Injectable()
export class GlobalScoreboardScoreCalculatorService extends PluggableService<
  GlobalScoreboardScoreCalculationStrategy,
  GlobalScoreboardScoreCalculator
> {
  constructor() {
    super();
  }

  async calculateScore(
    userId: number,
    strategy = GlobalScoreboardScoreCalculationStrategy.BY_SOLVE_COUNT_AND_LAST_SOLVE_TIME,
  ) {
    const service = this.pluggedServices.get(strategy);
    return service.calculateScore(userId);
  }
}
