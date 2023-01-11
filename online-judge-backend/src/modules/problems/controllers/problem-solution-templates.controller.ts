import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProblemSolutionTemplatesService } from '../services/problem-solution-templates.service';

@Controller('api')
export class ProblemSolutionTemplatesController {
  constructor(
    private readonly problemSolutionTemplatesService: ProblemSolutionTemplatesService,
  ) {}

  @Get('problems/:problemId/solution-templates')
  async getSolutionTemplates(
    @Param('problemId', ParseIntPipe) problemId: number,
  ) {
    return this.problemSolutionTemplatesService.getTemplates(problemId);
  }
}
