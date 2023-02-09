import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserStatisticsFormatter } from './formatters/user-statistics.formatter';
import { GlobalStatisticsService } from './services/global-statistics.service';
import { UserStatisticsService } from './services/user-statistics.service';

@Controller('api')
export class StatisticsController {
  constructor(
    private readonly globalStatisticsService: GlobalStatisticsService,
    private readonly userStatisticsService: UserStatisticsService,
    private readonly userStatisticsFormatter: UserStatisticsFormatter,
  ) {}

  @Get('statistics/global')
  async getGlobalStatistics() {
    return this.globalStatisticsService.getGlobalStatistics();
  }

  @Get('users/:userId/statistics')
  async getUserStatistics(@Param('userId', ParseIntPipe) userId: number) {
    const userStatistics = await this.userStatisticsService.getUserStatistics(
      userId,
    );

    return this.userStatisticsFormatter.format(userStatistics);
  }
}
