import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProblemsGetDto } from '../data-transfer-objects/problems-get.dto';
import { ProblemsService } from '../services/problems.service';

@Controller('api')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get('problems')
  async getProblems(@Query() problemsGetDto: ProblemsGetDto) {
    return this.problemsService.getProblems(problemsGetDto);
  }

  @Get('problems/:problemId')
  async getProblem(@Param('problemId', ParseIntPipe) problemId: number) {
    return this.problemsService.getProblem(problemId);
  }
}
