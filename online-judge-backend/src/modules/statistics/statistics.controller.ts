import { Controller, Get } from '@nestjs/common';
import { GlobalStatisticsService } from './services/global-statistics.service';

@Controller('api')
export class StatisticsController {
  constructor(
    private readonly globalStatisticsService: GlobalStatisticsService,
  ) {}

  @Get('statistics/global')
  async getGlobalStatistics() {
    return this.globalStatisticsService.getSubmissionsCount();
  }
}
