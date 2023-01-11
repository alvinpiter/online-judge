import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProblemCreationDto } from '../data-transfer-objects/problem-creation.dto';
import { ProblemUpdateDto } from '../data-transfer-objects/problem-update.dto';
import { ProblemsGetDto } from '../data-transfer-objects/problems-get.dto';
import { ProblemState } from '../entities/problem.entity';
import { ProblemsService } from '../services/problems.service';

@Controller('api/admin')
export class AdminProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get('problems')
  async getProblems(@Query() problemsGetDto: ProblemsGetDto) {
    return this.problemsService.getAdminProblems(problemsGetDto);
  }

  @Post('problems')
  async createProblem(@Body() problemCreationDto: ProblemCreationDto) {
    return this.problemsService.createProblem(problemCreationDto);
  }

  @Get('problems/:problemId')
  async getProblem(@Param('problemId', ParseIntPipe) problemId: number) {
    return this.problemsService.getProblem(problemId);
  }

  @Post('problems/:problemId/publish')
  async publishProblem(@Param('problemId', ParseIntPipe) problemId: number) {
    return this.problemsService.changeProblemState(
      problemId,
      ProblemState.PUBLISHED,
    );
  }

  @Post('problems/:problemId/draft')
  async draftProblem(@Param('problemId', ParseIntPipe) problemId: number) {
    return this.problemsService.changeProblemState(
      problemId,
      ProblemState.DRAFT,
    );
  }

  @Put('problems/:problemId')
  async updateProblem(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Body() problemUpdateDto: ProblemUpdateDto,
  ) {
    return this.problemsService.updateProblem(problemId, problemUpdateDto);
  }
}
