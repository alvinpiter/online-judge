import { Controller, Get } from '@nestjs/common';
import { GlobalScoreboardScoreCalculatorService } from './services/global-scoreboard-score-calculator/global-scoreboard-score-calculator.service';

@Controller('api')
export class ScoreboardController {
  constructor(
    private readonly globalScoreboardScoreCalculatorService: GlobalScoreboardScoreCalculatorService,
  ) {}

  @Get('scoreboard/playground')
  async playground() {
    return this.globalScoreboardScoreCalculatorService.calculateScore(1);
  }
}
