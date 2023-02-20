import { Controller, Get, Query } from '@nestjs/common';
import { ScoreboardGetDto } from '../data-transfer-objects/scoreboard-get.dto';
import { ScoreboardRowFormatter } from '../formatters/scoreboard-row.formatter';
import { ScoreboardReaderService } from '../services/scoreboard-reader.service';

@Controller('api')
export class ScoreboardController {
  constructor(
    private readonly scoreboardRowFormatter: ScoreboardRowFormatter,
    private readonly scoreboardReaderService: ScoreboardReaderService,
  ) {}

  @Get('scoreboard')
  async getScoreboard(@Query() scoreboardGetDto: ScoreboardGetDto) {
    const { data, meta } = await this.scoreboardReaderService.getScoreboard(
      scoreboardGetDto,
    );

    return {
      data: data.map((row) => this.scoreboardRowFormatter.format(row)),
      meta,
    };
  }

  @Get('scoreboard/problems')
  async getScoreboardProblems() {
    return this.scoreboardReaderService.getScoreboardProblems();
  }
}
