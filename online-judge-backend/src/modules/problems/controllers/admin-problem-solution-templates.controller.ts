import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProblemSolutionTemplateUpsertDto } from '../data-transfer-objects/problem-solution-template-upsert.dto';
import { ProblemSolutionTemplatesService } from '../services/problem-solution-templates.service';

@Controller('api/admin')
export class AdminProblemSolutionTemplatesController {
  constructor(
    private readonly problemSolutionTemplatesService: ProblemSolutionTemplatesService,
  ) {}

  @Post('problems/:problemId/solution-templates')
  async upsertSolutionTemplate(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Body() problemSolutionTemplateUpsertDto: ProblemSolutionTemplateUpsertDto,
  ) {
    return this.problemSolutionTemplatesService.upsertTemplate(
      problemId,
      problemSolutionTemplateUpsertDto,
    );
  }

  @Get('problems/:problemId/solution-templates')
  async getSolutionTemplates(
    @Param('problemId', ParseIntPipe) problemId: number,
  ) {
    return this.problemSolutionTemplatesService.getTemplates(problemId);
  }
}
