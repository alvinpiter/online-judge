import { Controller, Get, Query } from '@nestjs/common';
import { ProblemsGetDto } from '../data-transfer-objects/problems-get.dto';
import { ProblemsService } from '../services/problems.service';

@Controller('api')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get('problems')
  async getProblems(@Query() problemsGetDto: ProblemsGetDto) {
    return this.problemsService.getUserProblems(problemsGetDto);
  }
}
